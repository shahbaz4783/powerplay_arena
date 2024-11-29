import { FeaturedGames } from '@/src/app/miniapp/(bottom-nav)/featured-games';
import { FeaturedTiles } from '@/src/app/miniapp/(bottom-nav)/featured-tiles';
import { ProfileSummary } from '@/src/app/miniapp/(bottom-nav)/profile-summary';
import { QuickActions } from '@/src/app/miniapp/(bottom-nav)/quick-actions';

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
