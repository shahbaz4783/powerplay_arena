"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import batsmanImg from "@/assets/quickplay.png";
import trophyImg from "@/assets/tournament.png";
import Link from "next/link";
import { motion } from "framer-motion";
import { Coins, HandCoins } from 'lucide-react';

export function GameModes() {
	return (
		<motion.section
			className='grid grid-cols-2 min-h-40 gap-4 mb-6'
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<Card
				className='backdrop-blur-md rounded-xl overflow-hidden bg-no-repeat'
				style={{
					backgroundImage: `url(${batsmanImg.src})`,
					backgroundSize: 'contain',
					backgroundPosition: 'center',
				}}
			>
				<Link href={'/game/quickplay'}>
					<CardContent className='h-full flex flex-col items-center justify-end bg-sky-200 bg-opacity-15'></CardContent>
				</Link>
			</Card>

			<Card className='backdrop-blur-md bg-slate-800/50 rounded-xl overflow-hidden bg-no-repeat'>
				<Link href={'/game/coin-flip'}>
					<div className='h-full flex flex-col items-center justify-between'>
						<div className='relative w-24 h-24 mt-2'>
							<div className='w-full h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 shadow-lg flex items-center justify-center'>
								<Coins className='w-12 h-12 text-yellow-800' />
							</div>
						</div>
						<p className='text-muted-foreground bg-slate-700/50 p-2 w-full text-center'>
							Coin Flip Challege
						</p>
					</div>
				</Link>
			</Card>
		</motion.section>
	);
}
