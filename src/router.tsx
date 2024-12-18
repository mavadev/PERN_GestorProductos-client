import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Layout from './layouts/Layout';
import Products, { loader as getProductsLoader } from './pages/Products';
import CreateProduct, { action as newProductAction } from './pages/CreateProduct';
import EditProduct, { loader as editProductLoader, action as editProductAction } from './pages/EditProduct';
import {
	actionAvailability as updateAvailabilityAction,
	actionDelete as deleteProductAction,
} from './components/TableProducts';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Products />,
				loader: getProductsLoader,
				action: updateAvailabilityAction,
			},
			{
				path: 'crear/',
				element: <CreateProduct />,
				action: newProductAction,
			},
			{
				path: 'editar/:id', // 	ROA Patter ( Resource Oriented Design )
				element: <EditProduct />,
				loader: editProductLoader,
				action: editProductAction,
			},
			{
				path: 'eliminar/:id',
				action: deleteProductAction,
			},
		],
	},
];

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(routes);

export default router;
