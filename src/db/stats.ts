// import { Prisma, MatchFormat } from '@prisma/client';
// import { db } from '../lib/db';

// export async function getStatsByUserId(userId: bigint, format: MatchFormat) {
//   return db.stats.findUnique({
//     where: { userId_format: { userId, format } },
//   });
// }

// export async function createStats(userId: bigint, format: MatchFormat) {
//   return db.stats.create({
//     data: { userId, format },
//   });
// }

// export async function updateStats(userId: bigint, format: MatchFormat, data: Prisma.StatsUpdateInput) {
//   return db.stats.update({
//     where: { userId_format: { userId, format } },
//     data,
//   });
// }

// export async function getTopPlayersByWins(format: MatchFormat, limit: number = 10) {
//   return db.stats.findMany({
//     where: { format },
//     orderBy: { matchesWon: 'desc' },
//     take: limit,
//     include: { user: true },
//   });
// }
