import { token } from '@/src/constants/app-config';

export function InviteBonusInfo() {
	return (
		<section className='p-4 rounded-xl bg-slate-800 space-y-4'>
			<h3 className='font-bold'>100 {token.symbol} FOR INVITE</h3>

			<ul className='list-disc list-inside text-sm text-gray-300 space-y-2'>
				<li>Earn 100 coins for each friend who joins</li>
				<li>Get 10% of your friend's earnings for 30 days</li>
				<li>Unlock exclusive items after 5 successful referrals</li>
			</ul>
		</section>
	);
}
