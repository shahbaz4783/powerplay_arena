import Link from 'next/link';
import React from 'react';

const Navbar = () => {
	return (
		<header>
			<nav className='relative px-4 py-4 flex justify-between items-center '>
				<Link href={'/'}>
					<p className='font-bold font-mono'>Powerplay</p>
					<p className='font-mono text-xs text-right'>arena</p>
				</Link>

				<Link
					className='py-2 px-6 bg-blue-600 hover:bg-blue-800 text-sm text-white font-bold rounded-xl transition duration-200'
					href='https://t.me/powerplay_arena_bot'
					target='_blank'
				>
					Launch App
				</Link>
			</nav>
		</header>
	);
};

export default Navbar;
