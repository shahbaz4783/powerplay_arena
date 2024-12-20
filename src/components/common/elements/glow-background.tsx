'use client';

import { useEffect, useRef } from 'react';

export default function GlowBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const handleResize = () => {
			if (canvas) {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		const particles: Particle[] = [];
		const particleCount = 50;

		class Particle {
			x: number;
			y: number;
			size: number;
			speedX: number;
			speedY: number;
			canvasWidth: number;
			canvasHeight: number;

			constructor(canvasWidth: number, canvasHeight: number) {
				this.canvasWidth = canvasWidth;
				this.canvasHeight = canvasHeight;
				this.x = Math.random() * this.canvasWidth;
				this.y = Math.random() * this.canvasHeight;
				this.size = Math.random() * 5 + 1;
				this.speedX = Math.random() * 3 - 1.5;
				this.speedY = Math.random() * 3 - 1.5;
			}

			update() {
				this.x += this.speedX;
				this.y += this.speedY;

				if (this.size > 0.2) this.size -= 0.1;

				if (this.x < 0 || this.x > this.canvasWidth) this.speedX *= -1;
				if (this.y < 0 || this.y > this.canvasHeight) this.speedY *= -1;
			}

			draw(ctx: CanvasRenderingContext2D) {
				ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		function createParticles() {
			if (canvas) {
				for (let i = 0; i < particleCount; i++) {
					particles.push(new Particle(canvas.width, canvas.height));
				}
			}
		}

		function animateParticles() {
			if (ctx && canvas) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				for (let i = 0; i < particles.length; i++) {
					particles[i].update();
					particles[i].draw(ctx);

					if (particles[i].size <= 0.2) {
						particles.splice(i, 1);
						i--;
					}
				}
				if (particles.length < particleCount) {
					createParticles();
				}
			}
			requestAnimationFrame(animateParticles);
		}

		createParticles();
		animateParticles();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return <canvas ref={canvasRef} className='fixed inset-0 w-full h-full' />;
}
