import React from 'react';

interface SubtleGamingBackgroundProps {
	primaryColor?: string;
	intensity?: 'low' | 'medium' | 'high';
}

const SubtleGamingBackground: React.FC<SubtleGamingBackgroundProps> = ({
	primaryColor = '#3b82f6',
	intensity = 'medium',
}) => {
	const opacityMap = {
		low: {
			hex: '08',
			lines: 0.03,
			particles: 0.04,
		},
		medium: {
			hex: '0A',
			lines: 0.05,
			particles: 0.06,
		},
		high: {
			hex: '0D',
			lines: 0.07,
			particles: 0.08,
		},
	};

	const opacity = opacityMap[intensity];

	return (
		<div className='fixed inset-0 -z-10 overflow-hidden bg-gray-950/95'>
			{/* Hexagon matrix effect */}
			<div
				className='absolute inset-0 animate-matrix-slide'
				style={{
					backgroundImage: `linear-gradient(to right,
            ${primaryColor}${opacity.hex} 1px,
            transparent 1px
          ),
          linear-gradient(
            to bottom,
            ${primaryColor}${opacity.hex} 1px,
            transparent 1px
          )`,
					backgroundSize: '24px 24px',
				}}
			/>

			{/* Subtle diagonal lines */}
			<div
				className='absolute inset-0'
				style={{
					backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent 0px,
            transparent 19px,
            ${primaryColor} 19px,
            ${primaryColor} 20px
          )`,
					opacity: opacity.lines,
				}}
			/>

			{/* Ambient light effect */}
			<div className='absolute inset-0'>
				<div
					className='absolute h-96 w-96 rounded-full blur-3xl animate-pulse-slow'
					style={{
						background: `radial-gradient(
              circle at center,
              ${primaryColor}${opacity.hex} 0%,
              transparent 70%
            )`,
						top: '20%',
						left: '30%',
					}}
				/>
			</div>

			{/* Subtle moving particles */}
			{[...Array(8)].map((_, i) => (
				<div
					key={i}
					className='absolute h-1 w-1 rounded-full animate-float'
					style={{
						backgroundColor: primaryColor,
						opacity: opacity.particles,
						top: `${Math.random() * 100}%`,
						left: `${Math.random() * 100}%`,
						animationDelay: `${Math.random() * 10}s`,
						animationDuration: `${20 + Math.random() * 10}s`,
					}}
				/>
			))}

			{/* Very subtle noise overlay */}
			<div
				className='absolute inset-0 mix-blend-overlay opacity-[0.03]'
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
				}}
			/>
		</div>
	);
};

// Required animations
const styles = `
  @keyframes matrix-slide {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(24px);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(100px, -100px);
    }
  }

  .animate-matrix-slide {
    animation: matrix-slide 20s linear infinite;
  }

  .animate-float {
    animation: float 20s linear infinite;
  }

  .animate-pulse-slow {
    animation: pulse 10s ease-in-out infinite;
  }
`;

export default SubtleGamingBackground;
