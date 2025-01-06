import { cn } from '@/src/lib/utils';

interface GradientBorderProps {
	children: React.ReactNode;
	className?: string;
}

export function GradientBorder({ className, children }: GradientBorderProps) {
	return (
		<section
			className={cn(
				'p-3 rounded-xl border border-[rgba(139,92,246,0.2)] backdrop-blur-sm bg-gray-900/80 overflow-hidden',
				className
			)}
		>
			{children}
		</section>
	);
}

export const GlowingBorder: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => (
	<div className='relative rounded-2xl p-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>
		<div className='absolute inset-0 blur-xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30' />
		{children}
	</div>
);