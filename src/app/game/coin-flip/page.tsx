import { CoinFlipChallenge } from '@/src/components/games/coin-flip/coin-flip-game';
import { Header } from '@/src/components/common/elements/header';

export default function CoinFlipChallengePage() {
	return (
		<div className='space-y-6 text-gray-100 relative overflow-hidden'>
			<CoinFlipChallenge />
		</div>
	);
}
