import { cn } from '@/src/lib/utils';

interface GradientBorderProps {
	children: React.ReactNode;
	className?: string;
}

export function GradientBorder({ className, children }: GradientBorderProps) {
	return (
		<section
			className={cn(
				'relative p-3 rounded-xl border border-[rgba(139,92,246,0.2)] overflow-hidden',
				className
			)}
		>
			<div className='relative'>{children}</div>
		</section>
	);
}
