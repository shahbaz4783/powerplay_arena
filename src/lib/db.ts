import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}

class CustomPrismaClient extends PrismaClient {
	async $connect() {
		try {
			await super.$connect();
		} catch (error) {
			console.error('Failed to connect to the database', error);
			throw new Error('Database connection failed');
		}
	}
}

export const db = globalThis.prisma || new CustomPrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

// Attempt to connect immediately
db.$connect().catch(() => {
	console.error('Initial database connection failed');
});
