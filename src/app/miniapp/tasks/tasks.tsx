import { SOCIAL_TASKS_LIST } from '@/src/constants/engagement-data';
import { Header } from '../../../components/common/elements/header';
import ListItem from '../../../components/common/elements/list-item';

const TasksList = () => {
	return (
		<section className='space-y-5'>
			<Header
				title='Social Tasks'
				subtitle='Join powerplay arena community, be aware of new and following updates'
			/>
			<ul>
				{SOCIAL_TASKS_LIST.map((item, index) => (
					<ListItem
						key={index}
						title={item.title}
						href={item.href}
						icon={item.icon && <item.icon size={26} />}
						reward={item.reward}
					/>
				))}
			</ul>
		</section>
	);
};

export default TasksList;
