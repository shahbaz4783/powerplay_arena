import React from 'react';

const InventoryLoadingFallback = () => {
	return (
		<div className=''>
			<div className='grid grid-cols-2 gap-3'>
				{[...Array(6)].map((_, index) => (
					<div
						key={index}
						className='aspect-square animate-pulse overflow-hidden rounded-xl bg-gray-800'
					>
						<div className='h-full w-full bg-gradient-to-br from-gray-700/20 to-transparent' />
					</div>
				))}
			</div>
		</div>
	);
};

export default InventoryLoadingFallback;
