import { safeParse } from 'valibot';
import { DraftProductSchema, ProductsSchema } from '../types';
import axios from 'axios';

interface ProductData {
	[key: string]: FormDataEntryValue;
}

export async function addProduct(product: ProductData) {
	try {
		const result = safeParse(DraftProductSchema, {
			name: product.name,
			price: +product.price,
		});
		if (!result.success) throw new Error('Datos no válidos');

		// Crear Producto
		const url = `${import.meta.env.VITE_API_URL}/api/products`;
		await axios.post(url, result.output);
	} catch (error) {
		console.error(error);
	}
}

export async function getProducts() {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/products`;
		const {data: {data}} = await axios.get(url);
		const result = safeParse(ProductsSchema, data)
		if(!result.success) throw new Error('Hubo un error al obtener los productos')
		return result.output;
	} catch (error) {
		console.error(error);
	}
}
