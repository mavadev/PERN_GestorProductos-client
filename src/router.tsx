import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Layout from './layouts/Layout';
import Products from './pages/Products';
import CreateProduct, { action as newProductAction } from './pages/CreateProduct';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Products />,
			},
			{
				path: 'crear/',
				element: <CreateProduct />,
				action: newProductAction,
			},
		],
	},
];

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(routes);

export default router;
