import { type LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
	icon: LucideIcon;
	title: string;
	highlightedTitle?: string;
	description?: string;
	iconColor?: string;
	iconBgColor?: string;
}

export const SectionHeader = ({
	icon: Icon,
	title,
	highlightedTitle,
	description,
	iconColor = 'text-blue-400',
	iconBgColor = 'bg-blue-500/10',
}: SectionHeaderProps) => {
	return (
		<header className='flex items-center gap-3'>
			<div className={`p-3 ${iconBgColor} rounded-xl`}>
				<Icon className={`w-6 h-6 ${iconColor}`} />
			</div>
			<div className='flex-1 text-left'>
				<h2 className='text-xl text-slate-200 font-bold font-exo2'>
					{title}
					{highlightedTitle && (
						<span className='bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-2'>
							{highlightedTitle}
						</span>
					)}
				</h2>
				<p className='text-slate-400 text-xs font-poppins'>{description}</p>
			</div>
		</header>
	);
};
