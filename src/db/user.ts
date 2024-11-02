// import { MatchFormat } from '@prisma/client';
// import { db } from '../lib/db';
// import { GameState } from '../types/gameState';

// export const getUserById = async (telegramId: number) => {
// 	return await db.user.findUnique({
// 		where: { telegramId },
// 	});
// };

// export const getWalletBalanceById = async (telegramId: number) => {
// 	return await db.wallet.findUnique({
// 		where: { userId: telegramId },
// 	});
// };

// export async function updateStats(tx: any, userId: bigint, gameState: GameState) {
//   await tx.stats.update({
//     where: {
//       userId_format: {
//         userId,
//         format: gameState.matchSetup.format as MatchFormat,
//       },
//     },
//     data: {
//       matchesPlayed: { increment: 1 },
//       matchesWon: gameState.matchResult.winner === "player" ? { increment: 1 } : undefined,
//       matchesLost: gameState.matchResult.winner === "opponent" ? { increment: 1 } : undefined,
//       matchesTie: gameState.matchResult.winner === "tie" ? { increment: 1 } : undefined,
//       runsScored: { increment: gameState.player.runs },
//       ballsFaced: { increment: gameState.player.ballsFaced },
//       sixes: { increment: gameState.player.sixes },
//       fours: { increment: gameState.player.fours },
//       wicketsTaken: { increment: gameState.opponent.wickets },
//       runsConceded: { increment: gameState.opponent.runs },
//       ballsBowled: { increment: gameState.opponent.ballsFaced },
//     },
//   });
// }
