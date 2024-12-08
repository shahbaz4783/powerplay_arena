import { CheckCircle } from 'lucide-react';

interface OptionSelectionProps {
	options: string[];
	selectedOption: string | null;
	setSelectedOption: (option: string) => void;
}

export default function OptionSelection({
	options,
	selectedOption,
	setSelectedOption,
}: OptionSelectionProps) {
	return (
		<div className='grid grid-cols-2 gap-4 mb-6'>
			{options.map((option) => (
				<button
					key={option}
					className={`p-6 rounded-lg flex justify-between items-center ${
						selectedOption === option
							? 'bg-purple-600 text-white'
							: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
					}`}
					onClick={() => setSelectedOption(option)}
				>
					<span className='text-3xl font-bold'>Option {option}</span>
					{selectedOption === option && <CheckCircle className='w-6 h-6' />}
				</button>
			))}
		</div>
	);
}
