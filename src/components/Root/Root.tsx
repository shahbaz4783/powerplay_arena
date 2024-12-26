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
import { AppRoot } from '@telegram-apps/telegram-ui';

import { ErrorBoundary } from '@/src/components/layouts/feedback/ErrorBoundary';
import { ErrorPage } from '@/src/components/layouts/feedback/ErrorPage';
import { useDidMount } from '@/src/hooks/useDidMount';

import './styles.css';
import { LoadingUI } from '../layouts/feedback/loading-ui';
import DatabaseErrorBoundary from '../layouts/feedback/database-error';

function App({ children }: PropsWithChildren) {
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
			{children}
		</AppRoot>
	);
}

function RootInner({ children }: PropsWithChildren) {
	const debug = useLaunchParams().startParam === 'debug';

	useEffect(() => {
		if (debug) {
			import('eruda').then((lib) => lib.default.init());
		}
	}, [debug]);

	return (
		<SDKProvider acceptCustomStyles debug={debug}>
			<App>{children}</App>
		</SDKProvider>
	);
}

export function Root({ children }: PropsWithChildren) {
	const didMount = useDidMount();

	if (!didMount) {
		return <LoadingUI />;
	}

	return (
		<DatabaseErrorBoundary>
			<ErrorBoundary fallback={ErrorPage}>
				<RootInner>{children}</RootInner>
			</ErrorBoundary>
		</DatabaseErrorBoundary>
	);
}
