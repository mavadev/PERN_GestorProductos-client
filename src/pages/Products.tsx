import { Link } from 'react-router-dom';

const Products = () => {
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
		</>
	);
};

export default Products;
