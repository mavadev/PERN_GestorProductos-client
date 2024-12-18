import { ActionFunctionArgs, Form, redirect, useFetcher, useLoaderData, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils';
import { HeaderSection } from '../components';
import { deleteProduct, getProducts, updateProductAvailability } from '../services/ProductService';

export async function loader() {
	return await getProducts();
}

export async function actionDelete({ params }: ActionFunctionArgs) {
	if (!params.id) return redirect('/');
	await deleteProduct(+params.id);
	return redirect('/');
}

export async function actionAvailability({ request }: ActionFunctionArgs) {
	const data = Object.fromEntries(await request.formData());
	// Obtener id
	await updateProductAvailability(+data.id);
}

const Products = () => {
	const fetcher = useFetcher();
	const navigate = useNavigate();
	const products = useLoaderData<Product[]>();

	const handleNavigate = useMemo(
		() => (product: Product) =>
			navigate(`/editar/${product.id}`, {
				state: product,
			}),
		[]
	);

	const handleSubmit = useMemo(
		() => (event: React.FormEvent<HTMLFormElement>) => {
			if (!confirm('¿Desea eliminar este producto?')) {
				event?.preventDefault();
			}
		},
		[]
	);

	return (
		<>
			<HeaderSection
				linkPath='/crear'
				title='Productos'
				linkName='Crear Producto'
			/>

			<section>
				<table className='w-full mt-5 table-auto border'>
					<thead className='bg-slate-800 text-white text-xl'>
						<tr>
							<th className='py-4'>Nombre</th>
							<th className='py-4'>Precio</th>
							<th className='py-4'>Disponibilidad</th>
							<th className='py-4'>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr
								key={product.id}
								className='border text-center text-gray-800'>
								<td className='p-3 text-lg'>{product.name}</td>
								<td className='p-3 text-lg'>{formatCurrency(product.price)}</td>
								<td className='p-3 text-base font-bold'>
									<fetcher.Form method='POST'>
										<button
											name='id'
											type='submit'
											value={product.id}
											className={`border p-4 w-full uppercase border-none ${
												product.availability ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
											}`}>
											{product.availability ? 'Disponible' : 'Agotado'}
										</button>
									</fetcher.Form>
								</td>
								<td className='p-3'>
									<div className='flex flex-col gap-2 text-base '>
										<button
											onClick={() => handleNavigate(product)}
											className='button w-full bg-emerald-600 hover:bg-emerald-700 uppercase'>
											Editar
										</button>
										<Form
											method='POST'
											onSubmit={handleSubmit}
											className='w-full bg-black'
											action={`/eliminar/${product.id}`}>
											<input
												type='submit'
												value='Eliminar'
												className='button w-full bg-red-600 hover:bg-red-700 uppercase'
											/>
										</Form>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</>
	);
};

export default Products;
