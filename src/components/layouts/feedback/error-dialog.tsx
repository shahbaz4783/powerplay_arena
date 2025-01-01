'use client';

import { CircleX } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert';

interface ServerResponseDialogProps {
	message: string | null;
}

export function ServerResponseDialog({ message }: ServerResponseDialogProps) {
	return (
		<Alert className='bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/20 text-red-400'>
			<CircleX className='h-4 w-4 bg-red-500/10 text-red-400' />
			<AlertTitle>Transaction Failed</AlertTitle>
			<AlertDescription className='text-red-300'>{message}</AlertDescription>
		</Alert>
	);
}
