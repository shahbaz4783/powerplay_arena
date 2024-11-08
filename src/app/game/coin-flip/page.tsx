import { Header } from '@/src/components/shared/header';
import { CoinFlipChallenge } from '@/src/components/coin-flip/coin-flip-game';

export default function CoinFlipChallengePage() {
	return (
		<div className='min-h-screen space-y-6 text-gray-100 p-4 relative overflow-hidden'>
			<Header title='Coin Flip' subtitle='Flip coin and earn reward' />
			<CoinFlipChallenge />
		</div>
	);
}
