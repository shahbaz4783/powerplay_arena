'use client';

import { useState, useMemo, useActionState } from 'react';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import { ArrowLeftRight, Coins, Ticket } from 'lucide-react';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
import { token } from '@/src/constants/app-config';
import { executePowerExchange } from '@/src/actions/shop.action';
import { ServerResponse } from '@/src/components/common/message/server-response';
import { calculateExchangeValues } from '@/src/lib/utils';
import { FormResponse } from '@/src/types/types';
import { useUserInventory } from '@/src/hooks/useUserData';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { GameBalanceCard } from '@/src/components/common/cards/balance-card';
import { IconButton } from '@/src/components/common/buttons/primary-button';
import { PageLoadingScreen } from '@/src/components/layouts/global/page-loading-screen';
import LoadingOverlay from '@/src/components/common/dialog/loading-overlay';
import { ExchangeContent } from './exchange-content';
import { InfoCard } from '@/src/components/common/cards/info-card';

export function InGameExchange() {
	const { telegramId } = useCurrentUser();
	const { data: profile, isPending, mutate } = useUserInventory(telegramId);

	const [response, formAction, isLoading] = useActionState(
		async (prevState: FormResponse, formData: FormData) => {
			const result = await executePowerExchange(
				telegramId!,
				prevState,
				formData
			);
			if (result.message.success) {
				mutate();
			}
			return result;
		},
		{ message: {} }
	);

	const [passesToExchange, setPassesToExchange] = useState<number>(0);
	const [exchangeDirection, setExchangeDirection] = useState<
		'buyPasses' | 'sellPasses'
	>('buyPasses');

	const presetButtons = [
		{ label: '5 Pass', value: 5 },
		{ label: '20 Pass', value: 20 },
		{ label: '50 Pass', value: 50 },
	];

	const maxBuyablePasses = useMemo(() => {
		if (!profile) return 0;
		let passes = 0;
		while (
			calculateExchangeValues(passes + 1).totalPassCost <= profile.powerCoin
		) {
			passes++;
		}
		return passes;
	}, [profile]);

	if (isPending) {
		return <PageLoadingScreen pageType='shop' />;
	}

	if (!profile) {
		return (
			<div className='flex items-center justify-center p-4'>
				<Card className='w-full max-w-md bg-gray-800/50 border-2 border-red-400/50 text-white backdrop-blur-md'>
					<CardHeader className='text-center'>
						<CardTitle className='text-2xl font-bold text-red-400'>
							Error
						</CardTitle>
						<CardDescription className='text-red-200/80'>
							Failed to load profile data
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	const { netPassSaleAmount, totalPassCost } =
		calculateExchangeValues(passesToExchange);

	return (
		<main className='main-card'>
			<section className='space-y-4'>
				<div className='grid grid-cols-2 gap-2'>
					<InfoCard
						title={token.name}
						amount={profile.powerCoin}
						color='blue'
					/>
					<InfoCard
						title={token.pass}
						amount={profile.powerPass}
						color='blue'
					/>
				</div>
				<Tabs
					defaultValue='buyPasses'
					onValueChange={(value) => {
						setExchangeDirection(value as 'buyPasses' | 'sellPasses');
						setPassesToExchange(0);
					}}
				>
					<TabsList className='grid grid-cols-2 gap-3'>
						<TabsTrigger value='buyPasses'>
							<Coins className='mr-2 h-4 w-4' />
							Coin to Pass
						</TabsTrigger>
						<TabsTrigger value='sellPasses'>
							<Ticket className='mr-2 h-4 w-4' />
							Pass to Coin
						</TabsTrigger>
					</TabsList>
					<TabsContent value='buyPasses' className='mt-4 space-y-4'>
						<ExchangeContent
							direction='buyPasses'
							passesToExchange={passesToExchange}
							setPassesToExchange={setPassesToExchange}
							presetButtons={presetButtons}
							maxPasses={maxBuyablePasses}
						/>
					</TabsContent>
					<TabsContent value='sellPasses' className='mt-4 space-y-4'>
						<ExchangeContent
							direction='sellPasses'
							passesToExchange={passesToExchange}
							setPassesToExchange={setPassesToExchange}
							presetButtons={presetButtons}
							maxPasses={profile.powerPass}
						/>
					</TabsContent>
				</Tabs>

				<ServerResponse message={response.message} />
				<div className='sub-card grid grid-cols-2 gap-1'>
					<div className=''>
						<p className='text-gray-300 text-xs font-medium'>
							{exchangeDirection === 'buyPasses' ? 'Total Cost' : 'You Receive'}
						</p>
						<div className='flex items-center gap-2'>
							<span className='text-xl font-bold text-white'>
								{exchangeDirection === 'buyPasses'
									? totalPassCost
									: netPassSaleAmount}
							</span>
							<span className='text-sm text-gray-400'>{token.symbol}</span>
						</div>
					</div>
					<form action={formAction}>
						<input type='hidden' name='totalPass' value={passesToExchange} />
						<input
							type='hidden'
							name='exchangeDirection'
							value={exchangeDirection}
						/>
						<IconButton
							text={'Exchange'}
							loadingText='Exchanging...'
							icon={ArrowLeftRight}
							isLoading={isLoading}
						/>
					</form>
				</div>
			</section>
			<LoadingOverlay isOpen={isLoading} scene='exchange' />
		</main>
	);
}
