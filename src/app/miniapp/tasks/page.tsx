import TasksList from '@/src/components/earn/tasks';
import GradualSpacing from '@/src/components/magicui/gradual-spacing';

const TaskPage = () => {
	return (
		<div className='space-y-8'>
			<div className='min-h-[20svh] flex justify-center items-center'>
				<GradualSpacing
					className='text-center text-4xl font-bold tracking-[-0.1em]'
					text='Earn more coins'
				/>
			</div>
			<TasksList />
		</div>
	);
};

export default TaskPage;
