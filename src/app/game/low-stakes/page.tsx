import { Header } from '@/src/components/common/elements/header';
import UnderdogTriumph from '@/src/components/games/low-stakes/low-stakes';

export default function Home() {
	return (
		<main className='p-3'>
			<Header title='LowStakes' subtitle='Where the Underdog Takes It All' />
			<UnderdogTriumph />
		</main>
	);
}
