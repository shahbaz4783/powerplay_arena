import LeadSection from '@/src/app/(web)/lead-section';
import Navbar from '@/src/app/(web)/navbar';

export default function Home() {
	return (
		<div className='min-h-svh'>
			<Navbar />
			<LeadSection />
		</div>
	);
}
