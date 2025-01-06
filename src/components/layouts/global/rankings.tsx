'use client';

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/src/components/ui/avatar';
import { useUserRanking } from '@/src/hooks/useUserData';
import { Trophy, Medal, Award } from 'lucide-react';
import { MessageCard } from '../../common/cards/message-card';

export const Leaderboard = () => {
	const { data, isPending } = useUserRanking();

	const getRankIcon = (rank: number) => {
		switch (rank) {
			case 1:
				return <Trophy className='h-6 w-6 text-yellow-400' />;
			case 2:
				return <Medal className='h-6 w-6 text-gray-400' />;
			case 3:
				return <Award className='h-6 w-6 text-amber-600' />;
			default:
				return null;
		}
	};

	if (isPending) {
		return (
			<MessageCard
				title=''
				message='Fetching latest rankings...'
				type='loading'
			/>
		);
	}

	return (
		<section className='w-full max-w-2xl mx-auto text-white shadow-xl'>
			<div className='space-y-4'>
				{data?.map((ranking, index) => (
					<div
						key={index}
						className={`flex items-center space-x-4 p-4 rounded-xl ${
							index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
						} transition-colors duration-200`}
					>
						<div className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-cyan-400 font-bold'>
							{getRankIcon(index + 1) || index + 1}
						</div>
						<Avatar className='h-10 w-10'>
							<AvatarImage src={ranking.user.avatarUrl!} />
							<AvatarFallback>
								{ranking.user.firstName.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div className='flex-grow'>
							<p className='font-semibold'>{ranking.user.firstName}</p>
							<p className='text-sm text-gray-400'>Level {ranking.level}</p>
						</div>
						<div className='text-right space-x-1'>
							<span className='font-bold text-lg font-mono text-cyan-400'>
								{ranking.level}
							</span>
							<span className='text-xs text-cyan-200'>XP</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
