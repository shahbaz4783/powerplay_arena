import Link from 'next/link';
import ShinyButton from '../../magicui/shiny-button';
import { token } from '@/src/constants/app-config';

interface ListItemProps {
	title: string;
	icon: React.ReactNode;
	reward: number;
	href: string;
}

const ListItem = ({ title, icon, reward, href }: ListItemProps) => {
	return (
		<li className='border-b-[1px] grid grid-cols-10 gap-4 items-center py-4'>
			<div className='col-span-1'>{icon}</div>
			<div className='col-span-6'>
				<p className='font-semibold'>{title}</p>
				<p className='text-sm text-slate-300 font-mono'>
					+{reward} {token.symbol}
				</p>
			</div>
			<Link className='col-span-3' href={href} target='_blank'>
				<ShinyButton className='p-3' text='Claim' />
			</Link>
		</li>
	);
};

export default ListItem;
