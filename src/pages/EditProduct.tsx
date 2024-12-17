import {
	Link,
	Form,
	ActionFunctionArgs,
	useActionData,
	redirect,
	LoaderFunctionArgs,
	useLoaderData,
} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { getProductByID } from '../services/ProductService';
import { Product } from '../types';

export async function loader({ params }: LoaderFunctionArgs) {
	const { id } = params;
	const numberID = Number(id);

	if (!id || isNaN(numberID)) return redirect('/');

	const product = await getProductByID(numberID);
	return product;
}

export async function action({ request }: ActionFunctionArgs) {
	const data = Object.fromEntries(await request.formData());

	// Validación
	if (Object.values(data).includes('')) {
		return 'Todos los campos obligatorios';
	}
	// Editar Producto

	// redirect al usuario
	return redirect('/');
}

const EditProduct = () => {
	const error = useActionData<string>();
	const product = useLoaderData<Product>();

	return (
		<>
			<header className='flex justify-between pb-5 border-b-2'>
				<h2 className='text-2xl text-slate-700'>Editar Producto</h2>
				<Link
					to='/'
					className='bg-teal-700 p-3 text-sm font-bold text-white hover:bg-teal-600 rounded'>
					Ver Productos
				</Link>
			</header>
			<ErrorMessage error={error} />
			<Form
				method='PUT'
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
						defaultValue={product.name}
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
						step='0.01'
						name='price'
						type='number'
						defaultValue={product.price}
						placeholder='ej. 200, 300, 1200'
						className='block w-full p-3 bg-gray-100 mt-2'
					/>
				</div>
				<input
					type='submit'
					value='Editar Producto'
					className='w-full bg-teal-700 p-3 text-white font-bold text-lg cursor-pointer hover:bg-teal-600  rounded'
				/>
			</Form>
		</>
	);
};

export default EditProduct;
