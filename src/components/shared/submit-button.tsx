import { useFormStatus } from 'react-dom';
import ShinyButton from '../magicui/shiny-button';

const SubmitButton = ({
	title,
	loadingTitle,
}: {
	title: string;
	loadingTitle: string;
}) => {
	const { pending } = useFormStatus();
	return (
		<ShinyButton text={pending ? loadingTitle : title} className='rounded-xl' />
	);
};

export default SubmitButton;
