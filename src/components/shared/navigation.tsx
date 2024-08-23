'use client';

import Link from 'next/link';
import { NAVIGATION_LINKS } from '../../lib/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/lib/utils';

const Navigation = () => {
	const pathname = usePathname();

	return (
		<nav className='sticky bottom-0 border-t-[1px] m-auto flex justify-evenly py-4 gap-6 w-full backdrop-blur'>
			{NAVIGATION_LINKS.map((item) => (
				<Link key={item.href} href={item.href}>
					<div
						className={cn(
							'flex text-xs flex-col justify-center text-slate-300 gap-1 items-center',
							{
								'text-blue-300': pathname === item.href,
							}
						)}
					>
						{item.icon && <item.icon size={20} />}
						<p>{item.title}</p>
					</div>
				</Link>
			))}
		</nav>
	);
};

export default Navigation;
