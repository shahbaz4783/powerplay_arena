import { format, formatDistanceToNow, isPast } from 'date-fns';

export function useFormatDate() {
	const formatDate = (date: Date | string) => {
		const d = new Date(date);
		return format(d, 'MMM d, yyyy');
	};

	const formatDateDistance = (date: Date | string) => {
		const d = new Date(date);
		return formatDistanceToNow(d, { addSuffix: true });
	};

	const isExpired = (date: Date | string) => {
		return isPast(new Date(date));
	};

	return { formatDate, formatDateDistance, isExpired };
}
