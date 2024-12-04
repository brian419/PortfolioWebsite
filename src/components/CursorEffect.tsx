import { useEffect, useRef } from 'react';

const CursorEffect = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const particles: { x: number; y: number; radius: number; color: string }[] = [];

        const getRandomColor = () => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return `rgba(${r}, ${g}, ${b}, 0.7)`; 
        };

        const createParticle = (x: number, y: number) => {
            particles.push({
                x,
                y,
                radius: Math.random() * 3 + 1,
                color: getRandomColor(),
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                particle.radius *= 0.96; 
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                ctx.closePath();

                if (particle.radius < 0.5) particles.splice(index, 1); 
            });

            requestAnimationFrame(animate);
        };
        animate();

        const handleMouseMove = (e: MouseEvent) => {
            createParticle(e.clientX, e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none"></canvas>;
};

export default CursorEffect;
