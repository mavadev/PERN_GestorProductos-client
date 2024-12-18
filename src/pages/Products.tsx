import { useLoaderData } from 'react-router-dom';
import { Product } from '../types';
import { getProducts } from '../services/ProductService';
import { HeaderSection, TableProducts } from '../components';

export async function loader() {
	return await getProducts();
}

const Products = () => {
	const products = useLoaderData<Product[]>();

	return (
		<>
			<HeaderSection
				linkPath='/crear'
				title='Productos'
				linkName='Crear Producto'
			/>
			{products.length > 0 ? <TableProducts products={products} /> : <></>}
		</>
	);
};

export default Products;
