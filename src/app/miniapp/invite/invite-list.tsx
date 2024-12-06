import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/src/components/ui/avatar';
import { Users } from 'lucide-react';

type Friend = {
	id: string;
	name: string;
	avatar: string;
	joinedDate: string;
};

const friendsList: Friend[] = [
	{
		id: '1',
		name: 'Alice',
		avatar: '/avatars/01.png',
		joinedDate: '2023-05-15',
	},
	{ id: '2', name: 'Bob', avatar: '/avatars/02.png', joinedDate: '2023-06-22' },
	{
		id: '3',
		name: 'Charlie',
		avatar: '/avatars/03.png',
		joinedDate: '2023-07-03',
	},
];

export function InviteList() {
	return (
		<Card className='bg-card text-card-foreground rounded-xl'>
			<CardHeader>
				<CardTitle className='text-2xl flex items-center gap-2'>
					<Users className='w-6 h-6 text-primary' />
					Your Frens ({friendsList.length})
				</CardTitle>
			</CardHeader>
			<CardContent>
				{friendsList.length > 0 ? (
					<ul className='space-y-4'>
						{friendsList.map((friend) => (
							<li key={friend.id} className='flex items-center gap-3'>
								<Avatar>
									<AvatarImage src={friend.avatar} alt={friend.name} />
									<AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
								</Avatar>
								<div>
									<p className='font-semibold'>{friend.name}</p>
									<p className='text-sm text-muted-foreground'>
										Joined {friend.joinedDate}
									</p>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className='text-muted-foreground'>
						Your Frens will show here once they join.
					</p>
				)}
			</CardContent>
		</Card>
	);
}
