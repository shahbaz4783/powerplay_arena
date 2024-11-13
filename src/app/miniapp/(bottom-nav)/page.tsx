import { FeaturedGames } from '@/src/components/layouts/home/featured-games';
import { FeaturedTiles } from '@/src/components/layouts/home/featured-tiles';
import { ProfileSummary } from '@/src/components/layouts/home/profile-summary';
import { QuickActions } from '@/src/components/layouts/home/quick-actions';

const MiniAppHomePage = () => {
	return (
		<div className='space-y-5 min-h-[84svh]'>
			<ProfileSummary />
			<div className='grid grid-cols-3 gap-5'>
				<div className='col-span-2'>
					<FeaturedGames />
				</div>
				<QuickActions />
			</div>
			<FeaturedTiles />
		</div>
	);
};

export default MiniAppHomePage;
