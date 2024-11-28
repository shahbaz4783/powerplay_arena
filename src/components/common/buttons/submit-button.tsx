import { useFormStatus } from 'react-dom';
import ShinyButton from '../../magicui/shiny-button';
import { LoadingOverlay } from '../dialog/loading-overlay';

interface ClaimButtonProps {
	title: string;
	loadingTitle: string;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
}

export function SubmitButton({
	title,
	loadingTitle,
	className,
	onClick,
	disabled,
}: ClaimButtonProps) {
	const { pending } = useFormStatus();
	return (
		<>
			<ShinyButton
				disabled={disabled || pending}
				onClick={onClick}
				className={className}
				text={title}
			/>
			{pending && <LoadingOverlay initialMessage={loadingTitle} />}
		</>
	);
}

