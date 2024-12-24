'use client';

import { useActionState } from "react";
import Image from 'next/image';
import HeroImage from '@/public/hero-image.svg';
import { addEmailToWaitlist } from '@/src/actions/waitlist.action';
import SparklesText from '../../components/magicui/sparkles-text';
import { SubmitButton } from '../../components/common/buttons/submit-button';
import { ServerResponse } from '../../components/common/message/server-response';

const LeadSection = () => {
	const [formState, formAction] = useActionState(addEmailToWaitlist, {
		message: {},
	});

	return (
		<div className='grid lg:grid-cols-5 gap-20 lg:w-10/12 w-11/12 m-auto mt-32 justify-between'>
			<main className='space-y-16 col-span-3'>
				<div className='space-y-6'>
					<SparklesText
						colors={{ first: '#674188', second: '#F7EFE5' }}
						text='Join the Powerplay Arena waitlist'
						className='text-center text-4xl lg:text-6xl lg:text-left'
					/>
					<p className='text-slate-400 drop-shadow-sm'>
						A gaming platform offering thrilling mini-games and exclusive
						rewards. Currently in pre-launch, it aims to build anticipation and
						gather a waitlist of interested users.
					</p>
				</div>

				<div className='space-y-6'>
					<form
						action={formAction}
						className='lg:grid lg:grid-cols-7 space-y-4 lg:space-y-0 gap-4 justify-between'
					>
						<input
							name='email'
							className='col-span-5 w-full bg-slate-800 text-slate-400 rounded-xl p-4 outline-none font-light'
							placeholder='Enter your email'
						/>
						<div className='col-span-2 w-full'>
							<SubmitButton title='Join Waitlist!' loadingTitle='Joining...' />
						</div>
					</form>
					<p className='text-slate-400 text-xs drop-shadow-sm'>
						Enter your email to be among the first 1000 people to receive
						exclusive rewards when the game launches!
					</p>
				</div>

				<ServerResponse message={formState.message} />
			</main>
			<aside className='hidden lg:block col-span-2'>
				<Image
					className='w-full'
					src={HeroImage}
					width={500}
					height={500}
					alt='Avatar'
					draggable={false}
				/>
			</aside>
		</div>
	);
};

export default LeadSection;
