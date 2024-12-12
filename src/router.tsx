import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Layout from './layouts/Layout';
import { CreateProduct, Products } from './pages';

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
			},
		],
	},
];

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(routes);

export default router;
