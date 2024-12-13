import { Outlet } from 'react-router-dom';
const Layout = () => {
	return (
		<>
			<header className='bg-teal-900'>
				<div className='container mx-auto py-10'>
					<h1 className='text-3xl font-bold text-white text-center'>Administrador de Productos</h1>
				</div>
			</header>
			<main className='container mx-auto mt-10 p-10 bg-white shadow '>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
