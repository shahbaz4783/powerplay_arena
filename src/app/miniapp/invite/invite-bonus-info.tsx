import { Card, CardContent } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { token } from '@/src/constants/app-config';

export function InviteBonusInfo() {
	return (
		<Card className='bg-card text-card-foreground rounded-xl'>
			<CardContent className='space-y-4 p-3'>
				<div className='flex items-center justify-between'>
					<span className='text-lg'>Reward per Invite</span>
					<Badge variant='secondary' className='text-lg px-3 py-1'>
						500 {token.symbol}
					</Badge>
				</div>
				<p className='text-muted-foreground text-sm'>
					Earn 500 {token.symbol} for each friend who joins using your invite
					link.
				</p>
			</CardContent>
		</Card>
	);
}
