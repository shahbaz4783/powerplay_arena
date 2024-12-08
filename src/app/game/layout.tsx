const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex items-start flex-col max-w-[480px] m-auto'>
			<div className='flex-grow w-full'>{children}</div>
		</div>
	);
};

export default layout;
