import { Link } from 'react-router-dom';

const CreateProduct = () => {
	return (
		<>
			<header className='flex justify-between'>
				<h2 className='text-2xl text-slate-700'>Crear Producto</h2>
				<Link
					to='/'
					className='bg-teal-700 p-3 text-sm font-bold text-white hover:bg-teal-600 rounded'>
					Ver Productos
				</Link>
			</header>
		</>
	);
};

export default CreateProduct;
