import { Header } from '@/src/components/common/elements/header';
import { Awards } from '@/src/components/layouts/milestones/awards';
import { MilestonesPage } from '@/src/components/layouts/milestones/game-milestones';
import { UnclaimedRewards } from '@/src/components/layouts/milestones/unclaimed-rewards';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';

export default function AchievementPage() {
	return (
		<div className='space-y-6'>
			<Header
				title='Milestones'
				subtitle='Push your limits and unlock exclusive rewards'
			/>
			<Tabs defaultValue='challenges' className='w-full'>
				<TabsList className='grid grid-cols-3 mb-8 gap-4 rounded-xl bg-slate-400 h-auto'>
					<TabsTrigger
						value='challenges'
						className='flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900'
					>
						Challenges
					</TabsTrigger>
					<TabsTrigger
						value='awards'
						className='flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900'
					>
						My Awards
					</TabsTrigger>
					<TabsTrigger
						value='invites'
						className='flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900'
					>
						Unclaimed
					</TabsTrigger>
				</TabsList>
				<TabsContent value='challenges'>
					<MilestonesPage />
				</TabsContent>
				<TabsContent value='awards'>
					<Awards />
				</TabsContent>
				<TabsContent value='invites'>
					<UnclaimedRewards />
				</TabsContent>
			</Tabs>
		</div>
	);
}
