import { safeParse } from 'valibot';
import {
	DraftProductCreateSchema,
	DraftProductCreate,
	Product,
	ProductSchema,
	ProductsSchema,
	DraftProductEdit,
	DraftProductEditSchema,
} from '../types';
import axios from 'axios';

export async function addProduct(newProduct: DraftProductCreate) {
	try {
		const result = safeParse(DraftProductCreateSchema, newProduct);
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
		const {
			data: { data },
		} = await axios.get(url);
		const result = safeParse(ProductsSchema, data);
		if (!result.success) throw new Error('Hubo un error al obtener los productos');
		return result.output;
	} catch (error) {
		console.error(error);
	}
}

export async function getProductByID(productID: Product['id']) {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/products/${productID}`;
		const {
			data: { data },
		} = await axios.get(url);
		const result = safeParse(ProductSchema, data);
		if (!result.success) throw new Error('Hubo un error al obtener el producto');
		return result.output;
	} catch (error) {
		console.error(error);
	}
}

export async function updateProduct(productEdit: DraftProductEdit, id: Product['id']) {
	try {
		// Validar los datos
		const result = safeParse(DraftProductEditSchema, productEdit);
		if (!result.success) throw new Error('Datos no válidos');

		// Actualizar Producto
		const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
		await axios.put(url, result.output);
	} catch (error) {
		console.error(error);
	}
}
