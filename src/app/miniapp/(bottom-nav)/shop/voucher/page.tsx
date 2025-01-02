import { MessageCard } from '@/src/components/common/cards/message-card';
import { Header } from '@/src/components/common/elements/header';

export default function AvatarStorePage() {
	return (
		<div className='space-y-4'>
			<Header title='Consumable Store' subtitle='Low on balance? Fill it up.' />
			<MessageCard title='' message='No offers at the moment' type='info' />
		</div>
	);
}
