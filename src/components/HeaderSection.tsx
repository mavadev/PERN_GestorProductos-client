import { Link } from 'react-router-dom';

interface HeaderSectionProps {
	title: string;
	linkPath: string;
	linkName: string;
}

const HeaderSection = ({ title, linkPath, linkName }: HeaderSectionProps) => {
	return (
		<header className='flex justify-between pb-5 border-b-2'>
			<h2 className='text-2xl text-slate-700'>{title}</h2>
			<Link
				to={linkPath}
				className='bg-teal-700 p-3 text-sm font-bold text-white hover:bg-teal-600 rounded'>
				{linkName}
			</Link>
		</header>
	);
};

export default HeaderSection;
