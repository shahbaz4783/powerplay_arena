import { ProfileSummary } from '@/src/components/layouts/home/profile-summary';
import { FeaturedGames } from '@/src/components/layouts/home/featured-games';
import { FeaturedTiles } from '@/src/components/layouts/home/featured-tiles';

const MiniAppHomePage = () => {
	return (
		<div className='space-y-4 min-h-[84svh]'>
			<ProfileSummary />
			<FeaturedTiles />
			<FeaturedGames />
		</div>
	);
};

export default MiniAppHomePage;
