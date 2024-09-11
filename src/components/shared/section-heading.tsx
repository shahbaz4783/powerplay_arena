interface SectionHeadingProps {
	title: string;
	subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => {
	return (
		<div className='space-y-2'>
			<h2 className='font-semibold text-xl'>{title}</h2>
			<p className='text-sm text-slate-200'>{subtitle}</p>
		</div>
	);
};

export default SectionHeading;
