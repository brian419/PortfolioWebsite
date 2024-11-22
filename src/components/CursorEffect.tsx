"use client";
import { useEffect, useRef } from "react";

export default function CursorEffect() {
    const containerRef = useRef<HTMLDivElement>(null); // container to hold all particles

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        // creates multiple particles
        const particles: HTMLDivElement[] = [];
        for (let i = 0; i < 6; i++) { // number of particles
            const particle = document.createElement("div");
            particle.className =
                "absolute w-1 h-1 bg-[#C0C0C0] rounded-full opacity-0 transition-transform duration-500";
            container.appendChild(particle);
            particles.push(particle);
        }

        const handleMouseMove = (e: MouseEvent) => {
            particles.forEach((particle, index) => {
                const offsetX = (Math.random() - 0.5) * 50; // random X offset
                const offsetY = (Math.random() - 0.5) * 50; // random Y offset
                setTimeout(() => {
                    particle.style.left = `${e.pageX + offsetX}px`;
                    particle.style.top = `${e.pageY + offsetY}px`;
                    particle.style.opacity = "1";
                    particle.style.transform = `scale(${Math.random() + 0.5})`;
                }, index * 30); 
            });
        };

        const handleMouseLeave = () => {
            particles.forEach((particle) => {
                particle.style.opacity = "0";  // fades out particles
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            particles.forEach((particle) => particle.remove()); 
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed pointer-events-none z-50 top-0 left-0 w-full h-full"
        ></div>
    );
}
