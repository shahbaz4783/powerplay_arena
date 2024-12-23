import {
	Exo_2,
	Source_Sans_3 as Source_Sans_Pro,
	JetBrains_Mono,
  Nunito_Sans,
  Poppins,
  Fira_Code,
} from 'next/font/google';

export const exo2 = Exo_2({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-exo2',
});

export const sourceSansPro = Source_Sans_Pro({
	weight: ['400', '600', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-source-sans-pro',
});

export const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-jetbrains-mono',
});

export const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-poppins',
});

export const nunitoSans = Nunito_Sans({
	subsets: ['latin'],
	weight: ['300', '400', '600', '700'],
	display: 'swap',
	variable: '--font-nunito-sans',
});

export const firaCode = Fira_Code({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-fira-code',
});

