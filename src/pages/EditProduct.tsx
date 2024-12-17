import {
	LoaderFunctionArgs,
	ActionFunctionArgs,
	useActionData,
	useLoaderData,
	redirect,
	Link,
	Form,
} from 'react-router-dom';
import { toBoolean } from '../utils';
import { DraftProductEdit, Product } from '../types';
import { getProductByID, updateProduct } from '../services/ProductService';
import ErrorMessage from '../components/ErrorMessage';

export async function loader({ params }: LoaderFunctionArgs) {
	const { id } = params;
	const numberID = Number(id);

	if (!id || isNaN(numberID)) return redirect('/');

	const product = await getProductByID(numberID);
	if (!product) return redirect('/');

	return product;
}

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	// Validación
	if (Object.values(data).includes('')) {
		console.log(data);
		return 'Todos los campos obligatorios';
	}

	// Producto
	const productEdit: DraftProductEdit = {
		name: data.name as string,
		price: +data.price as number,
		availability: toBoolean(data.availability.toString()),
	};

	// Editar Producto
	if (params.id) await updateProduct(productEdit, +params.id);

	// redirect al usuario
	return redirect('/');
}

const availabilityOptions = [
	{ name: 'Disponible', value: true },
	{ name: 'No Disponible', value: false },
];

const EditProduct = () => {
	const product = useLoaderData<Product>();
	const error = useActionData<string>();

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
				className='pt-6'>
				<div className='mb-6'>
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
				<div className='mb-6'>
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
				<div className='mb-6'>
					<label
						htmlFor='availability'
						className='text-gray-800'>
						Disponibilidad:
					</label>
					<select
						id='availability'
						name='availability'
						className='mt-2 block w-full p-3 bg-gray-50'
						defaultValue={product?.availability.toString()}>
						{availabilityOptions.map(option => (
							<option
								key={option.name}
								value={option.value.toString()}>
								{option.name}
							</option>
						))}
					</select>
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
