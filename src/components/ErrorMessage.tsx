interface ErrorMessageProps {
	error: string | null;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
	if (!error) return <></>;

	return <p className='bg-red-600 text-center text-white font-bold p-3 uppercase'>{error}</p>;
};

export default ErrorMessage;
