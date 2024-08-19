'use client';

import React from 'react';
import { Gem } from 'lucide-react';
import SectionHeading from '../shared/section-heading';
import ShinyButton from '../magicui/shiny-button';

const DailyDrop = () => {
	return (
		<section className='space-y-5'>
			<SectionHeading
				title='Daily Tasks'
				subtitle='Join powerplay arena community, be aware of new and following updates'
			/>
			<article className='border-b-[1px] grid grid-cols-10 gap-4 items-center py-4'>
				<div className='col-span-1'>
					<Gem />
				</div>
				<div className='col-span-6'>
					<p className='font-semibold'>Daily Drop</p>
					<p className='text-sm text-slate-300 font-mono'>
						Get a daily dose of coins!
					</p>
				</div>
				<ShinyButton className='p-3 col-span-3' text='Claim' />
			</article>
		</section>
	);
};

export default DailyDrop;
