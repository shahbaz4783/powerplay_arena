'use client';

import { useInitData } from '@telegram-apps/sdk-react';
import { CircleUserRound, Gem } from 'lucide-react';

const UserInfo = () => {
	const initData = useInitData();
	const user = initData?.user;

	return (
		<header className='bg-slate-800 p-1 rounded-xl flex justify-between'>
			<div className=' flex gap-2 font-mono items-center'>
				<CircleUserRound size={20} strokeWidth={1.25} />
				<p className='text-xs'>{user?.firstName}</p>
			</div>
			<div className='bg-sky-800 px-4 py-2 flex gap-2 items-center rounded-xl'>
				<Gem className='text-blue-200' size={20} strokeWidth={2} />
				<p className='font-bold'>{234}</p>
			</div>
		</header>
	);
};

export default UserInfo;
