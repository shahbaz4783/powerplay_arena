import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import AnimatedGridPattern from '@/src/components/magicui/animated-grid-pattern';
import { Root } from '@/src/components/Root/Root';
import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';
import TanstackProvider from '../providers/tanstack-provider';
import { cn } from '../lib/utils';

export const metadata: Metadata = {
	title: 'Powerplay Arena',
	description: 'Play, compete and win',
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang='en'>
			<body>
				<Root>
					<AnimatedGridPattern
						numSquares={30}
						maxOpacity={0.1}
						duration={3}
						repeatDelay={1}
						className={cn(
							'[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
							'inset-x-0 inset-y-[-30%] skew-y-12'
						)}
					/>
					<TanstackProvider>{children}</TanstackProvider>
				</Root>
			</body>
		</html>
	);
}
