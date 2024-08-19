'use client';

import GradualSpacing from '../magicui/gradual-spacing';

const FeatureComingSoon = ({ feature }: { feature: string }) => {
	return (
		<div className='flex flex-col gap-2 justify-center items-center min-h-[65svh]'>
			<GradualSpacing
				className='font-display text-blue-300 text-center text-xl font-bold tracking-[-0.1em]  '
				text={feature + ' is'}
			/>
			<GradualSpacing
				className='font-display text-center text-2xl font-bold tracking-[-0.1em]  '
				text='Under Development'
			/>
			<GradualSpacing
				className='font-display text-blue-200 text-center text-lg font-bold tracking-[-0.1em] '
				text='Stay tuned for updates'
			/>
		</div>
	);
};

export default FeatureComingSoon;
