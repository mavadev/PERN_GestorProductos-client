import { boolean, number, object, string, InferOutput, array, omit } from 'valibot';

// Producto
export const ProductSchema = object({
	id: number(),
	name: string(),
	price: number(),
	availability: boolean(),
});
export type Product = InferOutput<typeof ProductSchema>;

// Productos
export const ProductsSchema = array(ProductSchema);

// Crear Producto
export const DraftProductCreateSchema = omit(ProductSchema, ['id', 'availability']);
export type DraftProductCreate = InferOutput<typeof DraftProductCreateSchema>;

// Editar Producto
export const DraftProductEditSchema = omit(ProductSchema, ['id']);
export type DraftProductEdit = InferOutput<typeof DraftProductEditSchema>;
