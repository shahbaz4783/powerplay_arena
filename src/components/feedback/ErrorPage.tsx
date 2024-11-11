import { useEffect } from 'react';
import { Button } from '@/src/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset?: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className='min-h-svh bg-gradient-to-br from-slate-900 to-sky-900 flex items-center justify-center p-4'>
			<div className='max-w-md w-full bg-black bg-opacity-50 p-8 rounded-xl text-center space-y-6'>
				<menu>
					<AlertTriangle className='w-16 h-16 text-red-500 mx-auto mb-4' />
					<h1 className='text-3xl font-bold text-white mb-2'>
						Oops! Something went wrong
					</h1>
					<code className='text-slate-400'>{error.message}</code>
				</menu>
				<menu className='grid grid-cols-2 gap-3'>
					<Button asChild className='w-full rounded-xl'>
						<Link href='/miniapp'>Return to Home</Link>
					</Button>
					{reset && (
						<Button
							className='w-full rounded-xl bg-sky-300'
							onClick={() => reset()}
						>
							Try again
						</Button>
					)}
				</menu>
			</div>
		</main>
	);
}
