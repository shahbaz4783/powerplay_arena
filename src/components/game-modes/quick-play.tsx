"use client";

import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/src/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";

import {
  Zap,
  Target,
  Trophy,
  Award,
  Clock,
  Bolt,
  Shield,
  Info,
} from "lucide-react";
import { startQuickMatch } from "@/src/actions/game.action";
import { token } from "@/src/lib/constants";
import { SubmitButton } from "@/src/components/feedback/submit-button";
import { useInitData } from "@telegram-apps/sdk-react";
import { useFormState } from "react-dom";
import { RewardItem } from "../cards/reward-card";
import FormFeedback from "../feedback/form-feedback";
import { useCricketGameState } from "@/src/lib/store";
import { MatchFormat, MATCH_FORMATS } from "@/src/types/gameState";
import { Header } from "../shared/header";

export function QuickPlayMode() {
  const [selectedFormat, setSelectedFormat] = useState<MatchFormat>("BLITZ");

  const { updateGameState } = useCricketGameState();

  const initData = useInitData();
  const user = initData?.user;

  const [response, formAction] = useFormState(
    startQuickMatch.bind(null, user?.id!),
    {
      message: {},
    },
  );

  useEffect(() => {
    const format = MATCH_FORMATS[selectedFormat];
    if (format) {
      updateGameState({
        matchSetup: format,
      });
    }
  }, [selectedFormat, updateGameState]);

  useEffect(() => {
    if (response.message.success) {
      updateGameState({
        gamePhase: "toss",
        matchSetup: MATCH_FORMATS[selectedFormat],
      });
    }
  }, [response.message.success, selectedFormat, updateGameState]);

  const handleFormatChange = (format: string) => {
    setSelectedFormat(format as MatchFormat);
  };

  const handleSubmit = (formData: FormData) => {
    const format = MATCH_FORMATS[selectedFormat];
    if (format) {
      formData.append("entryFee", format.entryFee.toString());
      formData.append("overs", format.overs.toString());
      formData.append("format", format.format);
    }
    formAction(formData);
  };

  return (
		<main className='min-h-svh space-y-2 flex flex-col justify-between'>
			<Header
				title='Quick Match'
				subtitle='Set up your game and jump into the action'
				className='mx-4 mt-3'
			/>

			<section className='p-4'>
				<Tabs
					value={selectedFormat}
					onValueChange={handleFormatChange}
					className='w-full'
				>
					<TabsList className='grid grid-cols-3 mb-8 gap-4 rounded-xl bg-slate-400 h-auto'>
						{Object.entries(MATCH_FORMATS).map(([key, format]) => (
							<TabsTrigger
								key={key}
								value={key}
								className='flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900'
							>
								<FormatIcon format={format.format} className='w-6 h-6 mb-2' />
								<span className='font-bold uppercase'>{format.format}</span>
							</TabsTrigger>
						))}
					</TabsList>
					{Object.entries(MATCH_FORMATS).map(([key, format]) => (
						<TabsContent key={key} value={key} className='space-y-6'>
							<div className='bg-slate-800/50 backdrop-blur-md p-6 rounded-xl'>
								<h4 className='text-lg font-semibold mb-4 text-center'>
									Match Details
								</h4>
								<Table className='rounded-xl'>
									<TableBody className='space-y-2 bg-muted/50 rounded-xl'>
										<TableRow>
											<TableCell className='font-medium text-gray-300 rounded-tl-xl'>
												Overs
											</TableCell>
											<TableCell className='text-right font-bold rounded-tr-xl'>
												{format.overs}
											</TableCell>
										</TableRow>

										<TableRow>
											<TableCell className='font-medium text-gray-300'>
												Wickets
											</TableCell>
											<TableCell className='text-right font-bold'>
												{format.totalWickets}
											</TableCell>
										</TableRow>

										<TableRow>
											<TableCell className='font-medium text-gray-300 rounded-bl-xl'>
												Entry Fees
											</TableCell>
											<TableCell className='text-right font-bold rounded-br-xl'>
												{format.entryFee} {token.pass}
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</div>

							<div className='flex justify-center'>
								<Dialog>
									<DialogTrigger asChild>
										<Button
											variant='outline'
											className='rounded-xl flex items-center gap-2'
										>
											<Info className='w-4 h-4' />
											View Reward Structure
										</Button>
									</DialogTrigger>
									<DialogContent className='sm:max-w-[425px]'>
										<DialogHeader>
											<DialogTitle>Reward Structure</DialogTitle>
										</DialogHeader>
										<div className='grid grid-cols-2 gap-4 mt-4'>
											<RewardItem
												icon={Zap}
												label='Six'
												value={format.rewards.six}
											/>
											<RewardItem
												icon={Target}
												label='Four'
												value={format.rewards.four}
											/>
											<RewardItem
												icon={Award}
												label='Wicket'
												value={format.rewards.wicket}
											/>
											<RewardItem
												icon={Trophy}
												label='Run Margin'
												value={format.rewards.runMargin}
											/>
										</div>
									</DialogContent>
								</Dialog>
							</div>
						</TabsContent>
					))}
				</Tabs>
				<FormFeedback error={response.message.error} />
			</section>
			<section className='bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-slate-900 p-6 sticky bottom-0'>
				<form action={handleSubmit} className='w-full'>
					<SubmitButton
						title={'Continue'}
						loadingTitle={`Paying ${MATCH_FORMATS[selectedFormat].entryFee} ${token.symbol}...`}
					/>
				</form>
			</section>
		</main>
	);
}

function FormatIcon({
  format,
  className,
}: {
  format: MatchFormat;
  className?: string;
}) {
  switch (format) {
    case "BLITZ":
      return <Bolt className={className} />;
    case "POWERPLAY":
      return <Trophy className={className} />;
    case "CLASSIC":
      return <Shield className={className} />;
    default:
      return <Clock className={className} />;
  }
}
