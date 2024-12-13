import { Link } from 'react-router-dom';

const CreateProduct = () => {
	return (
		<>
			<header className='flex justify-between pb-5 border-b-2'>
				<h2 className='text-2xl text-slate-700'>Crear Producto</h2>
				<Link
					to='/'
					className='bg-teal-700 p-3 text-sm font-bold text-white hover:bg-teal-600 rounded'>
					Ver Productos
				</Link>
			</header>

			<form className='space-y-6 pt-6'>
				<div>
					<label
						htmlFor='name'
						className='text-gray-800 text-lg'>
						Nombre Producto:
					</label>
					<input
						id='name'
						type='text'
						name='name'
						placeholder='ej. Monitor Curvo'
						className='block w-full p-3 bg-gray-100 mt-2'
					/>
				</div>
				<div>
					<label
						htmlFor='price'
						className='text-gray-800 text-lg'>
						Precio:
					</label>
					<input
						id='price'
						name='price'
						type='number'
						placeholder='ej. 200, 300, 1200'
						className='block w-full p-3 bg-gray-100 mt-2'
					/>
				</div>
				<input
					type='submit'
					value='Registrar Producto'
					className='w-full bg-teal-700 p-3 text-white font-bold text-lg cursor-pointer hover:bg-teal-600  rounded'
				/>
			</form>
		</>
	);
};

export default CreateProduct;
