import { Link, useLoaderData } from 'react-router-dom';
import { getProducts } from '../services/ProductService';
import { Product } from '../types';
import { formatCurrency } from '../utils';

export async function loader() {
	const products = await getProducts();
	return products;
}

const Products = () => {
	const products = useLoaderData<Product[]>();
	return (
		<>
			<header className='flex justify-between'>
				<h2 className='text-2xl text-slate-700'>Lista de Productos</h2>
				<Link
					to='/crear'
					className='bg-teal-700 p-3 text-sm font-bold text-white hover:bg-teal-600 rounded'>
					Crear Producto
				</Link>
			</header>

			<section className='p-2'>
				<table className='w-full mt-5 table-auto'>
					<thead className='bg-slate-800 text-white'>
						<tr>
							<th className='p-2'>Producto</th>
							<th className='p-2'>Precio</th>
							<th className='p-2'>Disponibilidad</th>
							<th className='p-2'>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr
								key={product.id}
								className='border-b'>
								<td className='p-3 text-lg text-gray-800'>{product.name}</td>
								<td className='p-3 text-lg text-gray-800'>{formatCurrency(product.price)}</td>
								<td className='p-3 text-lg text-gray-800 '>{product.availability ? 'Disponible' : 'Agotado'}</td>
								<td className='p-3 text-lg text-gray-800'>
									<p>Editar</p>
									<p>Eliminar</p>
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
