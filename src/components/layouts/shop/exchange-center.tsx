'use client';

import { useState, useMemo } from 'react';
import { useInitData } from '@telegram-apps/sdk-react';
import { useUserProfile } from '@/src/hooks/useUserData';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Slider } from '@/src/components/ui/slider';
import { Coins, Zap } from 'lucide-react';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
import { MessageCard } from '@/src/components/common/cards/message-card';
import { token } from '@/src/constants/app-config';
import { SubmitButton } from '@/src/components/common/buttons/submit-button';
import { useFormState } from 'react-dom';
import { executePowerExchange } from '@/src/actions/shop.action';
import { ServerResponse } from '@/src/components/common/message/server-response';
import { calculateExchangeValues } from '@/src/lib/utils';
import { FormResponse } from '@/src/types/types';

export function InGameExchange() {
	const initData = useInitData();
	const telegramId = BigInt(initData?.user?.id || 0);
	const {
		data: profile,
		isLoading,
		mutate,
	} = useUserProfile(initData?.user?.id);

	const [response, formAction] = useFormState(
		async (prevState: FormResponse, formData: FormData) => {
			const result = await executePowerExchange(
				telegramId,
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
		{ label: '5 Passes', value: 5 },
		{ label: '20 Passes', value: 20 },
		{ label: '50 Passes', value: 50 },
	];

	const maxBuyablePasses = useMemo(() => {
		if (!profile) return 0;
		let passes = 0;
		while (
			calculateExchangeValues(passes + 1).totalPassCost <= profile.balance
		) {
			passes++;
		}
		return passes;
	}, [profile]);

	if (isLoading) {
		return (
			<MessageCard
				title='Loading exchange'
				message='Please wait...'
				type='loading'
			/>
		);
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

	return (
		<Card className='w-full max-w-md bg-gray-800/30 border-2 border-blue-400/50 text-white shadow-lg shadow-blue-500/20 backdrop-blur-md rounded-xl'>
			<CardContent className='space-y-6 p-6'>
				<div className='flex justify-between text-sm text-blue-300'>
					<span>
						{token.symbol} balance: {profile.balance}
					</span>
					<span>Available Passes: {profile.powerPass}</span>
				</div>
				<Tabs
					defaultValue='buyPasses'
					onValueChange={(value) => {
						setExchangeDirection(value as 'buyPasses' | 'sellPasses');
						setPassesToExchange(0);
					}}
				>
					<TabsList className='grid w-full grid-cols-2 bg-blue-900/50 rounded-xl'>
						<TabsTrigger
							value='buyPasses'
							className='data-[state=active]:bg-blue-600 rounded-xl data-[state=active]:text-white'
						>
							<Coins className='mr-2 h-4 w-4' />
							Buy Passes
						</TabsTrigger>
						<TabsTrigger
							value='sellPasses'
							className='data-[state=active]:bg-blue-600 rounded-xl data-[state=active]:text-white'
						>
							<Zap className='mr-2 h-4 w-4' />
							Sell Passes
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
				<form action={formAction}>
					<input type='hidden' name='totalPass' value={passesToExchange} />
					<input
						type='hidden'
						name='exchangeDirection'
						value={exchangeDirection}
					/>
					<SubmitButton
						disabled={passesToExchange <= 0}
						title='Exchange Now'
						loadingTitle='Converting...'
					/>
				</form>
			</CardContent>
		</Card>
	);
}

interface ExchangeContentProps {
	direction: 'buyPasses' | 'sellPasses';
	passesToExchange: number;
	setPassesToExchange: (value: number) => void;
	presetButtons: { label: string; value: number }[];
	maxPasses: number;
}

function ExchangeContent({
	direction,
	passesToExchange,
	setPassesToExchange,
	presetButtons,
	maxPasses,
}: ExchangeContentProps) {
	const { totalPassCost, netPassSaleAmount, exchangeFee } =
		calculateExchangeValues(passesToExchange);

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<span className='text-lg font-semibold text-blue-300'>
					Power Passes
				</span>
				<span className='text-lg font-semibold text-blue-200'>
					{passesToExchange}
				</span>
			</div>
			<Slider
				min={0}
				max={maxPasses}
				value={[passesToExchange]}
				onValueChange={([value]) => setPassesToExchange(value)}
				step={1}
				className='w-full'
			/>
			<div className='flex justify-between gap-2'>
				{presetButtons.map((btn) => (
					<Button
						key={btn.label}
						onClick={() => setPassesToExchange(Math.min(btn.value, maxPasses))}
						variant='secondary'
						size='sm'
						className='flex-1 bg-blue-700/50 rounded-xl text-white disabled:bg-blue-800/30 disabled:text-blue-200/50'
						disabled={btn.value > maxPasses}
					>
						{btn.label}
					</Button>
				))}
			</div>
			<div className='space-y-2'>
				<p className='text-sm text-blue-200'>
					{direction === 'buyPasses'
						? `Total Cost: ${totalPassCost}`
						: `You'll receive: ${netPassSaleAmount}`}{' '}
					{token.symbol}
				</p>
				<p className='text-xs text-blue-300'>
					(Includes fee: {exchangeFee} {token.symbol})
				</p>
			</div>
		</div>
	);
}
