'use client';

import { type PropsWithChildren, useEffect, useMemo } from 'react';
import {
	SDKProvider,
	useLaunchParams,
	useMiniApp,
	useThemeParams,
	useViewport,
	bindMiniAppCSSVars,
	bindThemeParamsCSSVars,
	bindViewportCSSVars,
} from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { ErrorBoundary } from '@/src/components/layouts/feedback/ErrorBoundary';
import { ErrorPage } from '@/src/components/layouts/feedback/ErrorPage';
import { useTelegramMock } from '@/src/hooks/useTelegramMock';
import { useDidMount } from '@/src/hooks/useDidMount';

import './styles.css';
import { LoadingUI } from '../layouts/feedback/loading-ui';

function App(props: PropsWithChildren) {
	const lp = useLaunchParams();
	const miniApp = useMiniApp();
	const themeParams = useThemeParams();
	const viewport = useViewport();

	useEffect(() => {
		return bindMiniAppCSSVars(miniApp, themeParams);
	}, [miniApp, themeParams]);

	useEffect(() => {
		return bindThemeParamsCSSVars(themeParams);
	}, [themeParams]);

	useEffect(() => {
		return viewport && bindViewportCSSVars(viewport);
	}, [viewport]);

	return (
		<AppRoot
			appearance={miniApp.isDark ? 'dark' : 'light'}
			platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
		>
			{props.children}
		</AppRoot>
	);
}

function RootInner({ children }: PropsWithChildren) {
	// if (process.env.NODE_ENV === 'development') {
	// useTelegramMock();
	// }

	const debug = useLaunchParams().startParam === 'debug';
	const manifestUrl = useMemo(() => {
		return new URL('tonconnect-manifest.json', window.location.href).toString();
	}, []);

	useEffect(() => {
		if (debug) {
			import('eruda').then((lib) => lib.default.init());
		}
	}, [debug]);

	return (
		<TonConnectUIProvider manifestUrl={manifestUrl}>
			<SDKProvider acceptCustomStyles debug={debug}>
				<App>{children}</App>
			</SDKProvider>
		</TonConnectUIProvider>
	);
}

export function Root(props: PropsWithChildren) {
	const didMount = useDidMount();

	return didMount ? (
		<ErrorBoundary fallback={ErrorPage}>
			<RootInner {...props} />
		</ErrorBoundary>
	) : (
		<LoadingUI />
	);
}
