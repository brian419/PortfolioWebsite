"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import headshot from '../../components/Photo.png';

export default function AboutMe() {
    const [position, setPosition] = useState({ top: 50, left: 50 });

    useEffect(() => {
        let animationFrame: number;
        let lastMoveTime = 0;
        const delay = 6000; // move every 6 seconds

        const moveRabbit = (time: number) => {
            if (time - lastMoveTime >= delay) {
                const rabbitWidth = 60;
                const rabbitHeight = 60;
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                const newTop = Math.random() * (viewportHeight - rabbitHeight);
                const newLeft = Math.random() * (viewportWidth - rabbitWidth);

                setPosition({ top: newTop, left: newLeft });
                lastMoveTime = time; // Update the last move time
            }

            animationFrame = requestAnimationFrame(moveRabbit); // Continue the animation loop
        };

        animationFrame = requestAnimationFrame(moveRabbit); // Start the animation loop
        return () => cancelAnimationFrame(animationFrame);  // Cleanup
    }, []);


    return (
        <div className="min-h-screen flex flex-col text-gray-800 overflow-hidden">
            {/* About Me Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-[#49A097] mb-6">About Me</h1>
                    <p className="text-lg text-white max-w-3xl mx-auto">
                        Hi, I&apos;m Jeongbin Son, a passionate web developer specializing in creating interactive web applications with React.js, Next.js, and Three.js. I enjoy building websites and learning new technologies to push the limits of what&apos;s possible in web development.
                    </p>
                </div>

                {/* Photo Section */}
                <div className="flex justify-center mb-12">
                    <Image
                        src={headshot}
                        alt="Jeongbin Son"
                        width={300}
                        height={300}
                        className="rounded-full"
                    />
                </div>

                <div className="flex flex-wrap justify-center items-start space-y-8 md:space-y-0 md:space-x-8">
                    {/* Personal Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md bg-[#AEADBD]">
                        <h2 className="text-3xl font-bold text-[#49A097] mb-4">Personal Background</h2>
                        <p className="text-gray-700 leading-relaxed">
                            I was born and raised in South Korea and have spent over 15 years in the United States, which has given me a unique perspective on both cultures. With my bilingual skills, I have a deep passion for helping bridge communication gaps through technology and language.
                        </p>
                    </div>

                    {/* Professional Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md bg-[#AEADBD]">
                        <h2 className="text-3xl font-bold text-[#49A097] mb-4">Professional Journey</h2>
                        <p className="text-gray-700 leading-relaxed">
                            I am a Computer Science major at the University of Alabama, currently interning at ChemTalk where I build web applications to promote chemistry education. With experience in React.js, Next.js, and Tailwind CSS, I aim to develop intuitive and impactful user experiences.
                        </p>
                    </div>
                </div>
                {/* Technical Stack / Skills Section */}
                <br></br>
                <br></br>
                <br></br>
                {/* <hr className="border-[#49A097] border-2 mt-10 mb-10"></hr> */}
                <hr className="border-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-gradient-x mt-10 mb-10"></hr>


                <br></br>
                <br></br>
                <div className="container mx-auto text-center px-4">
                    <h2 className="text-4xl font-extrabold text-[#7FB3AD] mb-8">
                        Tech Stack
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Frontend */}
                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                React.js
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                TypeScript
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Next.js
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Three.js
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Tailwind CSS
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                CSS
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                HTML
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Javascript
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        {/* Backend */}
                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#A6C5D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Node.js
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#A6C5D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Express.js
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#A6C5D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                MySQL: MongoDB & Amazon AWS (RDS)
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#A6C5D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                RESTful APIs
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#A6C5D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                TypeScript
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        {/* Tools */}
                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#A6C5D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Git
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#C3A7D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                GitHub
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#C3A7D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Visual Studio Code
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#C3A7D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Figma
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#C3A7D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Vercel
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                    </div>
                </div>
            </section>


            {/* what I know section */}
            <hr className="border-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-pulse2 mt-10 mb-10"></hr>

            {/* Rabbit */}
            <div
                className="rabbit-container transition-all duration-1000 ease-in-out"
                style={{
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    position: 'fixed',
                    transform: 'translate(-50%, -50%)',
                    willChange: 'transform',
                    zIndex: 0,
                }}
            >
                <svg width="60" height="60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        {/* Glowing effect */}
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* AI-Rabbit body with glow */}
                    <ellipse cx="100" cy="130" rx="40" ry="50" fill="#ffffff" filter="url(#glow)" />

                    {/* AI-Rabbit ears */}
                    <ellipse cx="80" cy="60" rx="15" ry="40" fill="#ffffff" filter="url(#glow)" />
                    <ellipse cx="120" cy="60" rx="15" ry="40" fill="#ffffff" filter="url(#glow)" />

                    {/* Inner ears */}
                    <ellipse cx="80" cy="60" rx="10" ry="30" fill="#00ffff" filter="url(#glow)" />
                    <ellipse cx="120" cy="60" rx="10" ry="30" fill="#00ffff" filter="url(#glow)" />

                    {/* AI-Rabbit face */}
                    <circle cx="85" cy="120" r="5" fill="#00ff00" /> {/* Left eye */}
                    <circle cx="115" cy="120" r="5" fill="#00ff00" /> {/* Right eye */}
                    <ellipse cx="100" cy="140" rx="8" ry="4" fill="#ff00ff" /> {/* Nose */}

                    {/* AI-Rabbit whiskers */}
                    <line x1="70" y1="140" x2="90" y2="140" stroke="#00ffff" strokeWidth="2" />
                    <line x1="130" y1="140" x2="110" y2="140" stroke="#00ffff" strokeWidth="2" />

                    {/* AI-Rabbit feet */}
                    <ellipse cx="80" cy="180" rx="10" ry="5" fill="#ffffff" filter="url(#glow)" />
                    <ellipse cx="120" cy="180" rx="10" ry="5" fill="#ffffff" filter="url(#glow)" />
                </svg>
            </div>
        </div>
    );
}

