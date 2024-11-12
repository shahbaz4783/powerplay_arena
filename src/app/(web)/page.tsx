import LeadSection from '@/src/components/layouts/web/lead-section';
import Navbar from '@/src/components/layouts/web/navbar';

export default function Home() {
	return (
		<div className='min-h-svh'>
			<Navbar />
			<LeadSection />
		</div>
	);
}
