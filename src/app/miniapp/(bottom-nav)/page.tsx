import { GameModes } from '@/src/components/layouts/home/game-modes';
import { NavCards } from '@/src/components/layouts/home/navs';
import { UserProfileHeader } from '@/src/components/layouts/home/user-profile-header';

const MiniAppHomePage = () => {
	return (
		<div className='space-y-5 min-h-[84svh]'>
			<UserProfileHeader />
			<GameModes />
			<NavCards />
		</div>
	);
};

export default MiniAppHomePage;
