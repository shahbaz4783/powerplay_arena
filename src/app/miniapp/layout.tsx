import Navigation from '@/src/components/layouts/global/navigation';

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='min-h-svh lg:border flex items-start flex-col max-w-[480px] m-auto'>
			<div className='flex-grow p-3 w-full'>{children}</div>
			<Navigation />
		</div>
	);
};

export default layout;
