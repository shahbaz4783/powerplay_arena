import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonBaseProps {
	href: string;
	icon: React.ElementType;
	label: string;
}

interface DescriptedButtonProps extends ButtonBaseProps {
	title: string;
	description: string;
	accentColor: string;
}

const ButtonBase: React.FC<ButtonBaseProps & { children: React.ReactNode }> = ({
	href,
	children,
}) => (
	<Link href={href} className='block w-full'>
		<motion.div whileTap={{ scale: 0.95 }} className='h-full'>
			{children}
		</motion.div>
	</Link>
);

export const DescriptedButton = ({
	title,
	description,
	icon: Icon,
	href,
	accentColor,
}: DescriptedButtonProps) => (
	<ButtonBase href={href} icon={Icon} label={title}>
		<div
			className={`bg-gray-800 rounded-xl p-4 flex items-center space-x-4 border-l-4 ${accentColor}`}
		>
			<Icon className='w-8 h-8 text-white' />
			<div>
				<h3 className='text-lg font-bold text-white mb-1'>{title}</h3>
				<p className='text-xs text-gray-400'>{description}</p>
			</div>
		</div>
	</ButtonBase>
);

export const IconLabelButton = ({
	href,
	icon: Icon,
	label,
}: ButtonBaseProps) => (
	<ButtonBase href={href} icon={Icon} label={label}>
		<div className='h-full bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-xl p-3 rounded-xl transition-all duration-300'>
			<div className='flex flex-col items-center justify-center h-full'>
				<Icon size={24} className='mb-2 text-primary' />
				<span className='text-primary-foreground text-xs font-mono text-slate-400'>
					{label}
				</span>
			</div>
		</div>
	</ButtonBase>
);

export const IconButton = ({ icon: Icon, href, label }: ButtonBaseProps) => (
	<ButtonBase href={href} icon={Icon} label={label}>
		<div className='w-full bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 border-b-4 border-blue-500'>
			<Icon className='w-7 h-7 text-white' />
		</div>
	</ButtonBase>
);
