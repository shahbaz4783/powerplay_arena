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
					className={cn('p-3 rounded-xl bg-emerald-800', {
						'bg-red-800': error,
					})}
				>
					<BlurIn word={error ?? success} />
				</div>
			</>
		);
};

export default FormFeedback;
