import { useLoaderData, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils';
import { HeaderSection } from '../components';
import { getProducts } from '../services/ProductService';

export async function loader() {
	return await getProducts();
}

const Products = () => {
	const navigate = useNavigate();
	const products = useLoaderData<Product[]>();

	const handleNavigate = useMemo(
		() => (product: Product) =>
			navigate(`/editar/${product.id}`, {
				state: product,
			}),
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
					<tbody className='text-lg'>
						{products.map(product => (
							<tr
								key={product.id}
								className='border text-center text-gray-800'>
								<td className='p-3'>{product.name}</td>
								<td className='p-3'>{formatCurrency(product.price)}</td>
								<td className='p-3'>{product.availability ? 'Disponible' : 'Agotado'}</td>
								<td className='p-3'>
									<div className='flex gap-2'>
										<button
											onClick={() => handleNavigate(product)}
											className='button flex-1 bg-green-600 hover:bg-green-700'>
											Editar
										</button>
										<button className='button flex-1 bg-red-600 hover:bg-red-700'>Eliminar</button>
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
