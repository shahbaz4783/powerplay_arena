import { db } from "../lib/db";

export async function getXPByUserId(userId: bigint) {
  return db.xP.findUnique({ where: { userId } });
}

export async function createXP(userId: bigint, initialXP: number = 0) {
  return db.xP.create({
    data: { userId, totalXP: initialXP, levelName: '' },
  });
}

export async function updateXP(userId: bigint, xpToAdd: number) {
  return db.xP.update({
    where: { userId },
    data: {
      totalXP: { increment: xpToAdd },
    },
  });
}

export async function getTopXPUsers(limit: number = 10) {
  return db.xP.findMany({
    orderBy: { totalXP: "desc" },
    take: limit,
    include: { user: true },
  });
}
