import { Link, Form, ActionFunctionArgs, useActionData } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

export async function action({ request }: ActionFunctionArgs) {
	const data = Object.fromEntries(await request.formData());

	// Validación
	if (Object.values(data).includes('')) {
		return 'Todos los campos obligatorios';
	}

	// redirect al usuario a productos
	return null;
}

const CreateProduct = () => {
	const error = useActionData() as string;

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
			<ErrorMessage error={error} />
			<Form
				method='POST'
				className='space-y-6 pt-6'>
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
			</Form>
		</>
	);
};

export default CreateProduct;
