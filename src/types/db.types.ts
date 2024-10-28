import { PrismaClient, Prisma } from '@prisma/client'
import { LucideIcon } from 'lucide-react';

export type PrismaClientOrTransaction = PrismaClient | Prisma.TransactionClient;

export interface Milestone {
	id: string;
	title: string;
	description: string;
	progress: number;
	total: number;
	reward: number;
	isCompleted: boolean;
}