import { cn } from '@/src/lib/utils';
import BlurIn from '../magicui/blur-in';

const FormFeedback = ({
	error,
	success,
}: {
	error?: string;
	success?: string;
}) => {
	if (error || success)
		return (
			<>
				<div
					className={cn(' text-cyan-300', {
						'text-red-400': error,
					})}
				>
					<BlurIn word={error ?? success} />
				</div>
			</>
		);
};

export default FormFeedback;