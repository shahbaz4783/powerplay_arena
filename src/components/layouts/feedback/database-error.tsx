'use client';

import React, { ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
}

class DatabaseErrorBoundary extends React.Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(_: Error): State {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Database error:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div>
					<AlertCircle className='h-4 w-4' />
					<p>Error</p>
					<p>
						We're having trouble connecting to our database. Please try again
						later or contact support if the problem persists.
					</p>
				</div>
			);
		}

		return this.props.children;
	}
}

export default DatabaseErrorBoundary;
