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
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#49A097] to-[#1D976C] mb-6 shadow-xl p-4">
                        About Me
                    </h1>
                    <p className="text-lg text-white max-w-3xl mx-auto">
                        Welcome to my portfolio! I&apos;m Jeongbin (Brian) Son, an aspiring web developer.
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

                <div className="flex flex-wrap justify-center items-stretch space-y-8 md:space-y-0 md:space-x-8">
                    {/* Personal Section */}
                    <div className="bg-[#f6fff7] shadow-lg rounded-lg p-6 flex-1 border-t-4 border-[#49A097]">
                        <h2 className="text-3xl font-bold text-[#49A097] mb-4 text-center">Personal Background</h2>
                        <p className="text-gray-700 leading-relaxed">
                            I was born in South Korea but have spent over 15 years in the United States, which has given me a unique perspective on both cultures. I&apos;ve also received my green card and embraced opportunities to grow in a multicultural environment. With my bilingual skills, I am passionate about bridging communication gaps through technology. Beyond this, I aspire to make a broader impact by helping communities through my software solutions.
                        </p>
                    </div>

                    {/* Professional Section */}
                    {/* was using bg-[#d7f3e4] for the first div but changed for now */}
                    <div className="bg-[#f6fff7] shadow-lg rounded-lg p-6 flex-1 border-t-4 border-[#49A097]">
                        <h2 className="text-3xl font-bold text-[#49A097] mb-4 text-center">Professional Journey</h2>
                        <p className="text-gray-700 leading-relaxed">
                            I have studied Computer Science at the University of Alabama, where I built a strong foundation in software development. My journey into web development began during my internship at ChemTalk, where I first learned to create web applications, sparking my interest in the field. Since then, I have revamped my personal portfolio website with a modern tech stack and collaborated on a full stack web application for UA&apos;s Waterski Team. I aspire to continue growing as a software developer to create meaningful solutions that drive positive change!
                        </p>
                    </div>
                </div>
                {/* Technical Stack / Skills Section */}
                <br></br>
                <br></br>
                <br></br>
                {/* <hr className="border-[#49A097] border-2 mt-10 mb-10"></hr> */}
                <hr className="border-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-gradient-x mt-10 mb-10"></hr>

                {/* Legend Section*/}
                <div className="container mx-auto text-center px-4">
                    <div className="flex justify-center space-x-8">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 "></div>
                            <span className="text-lg text-[#B0C3AA]">Frontend</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 "></div>
                            <span className="text-lg text-[#A6C5D6]">Backend</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 \"></div>
                            <span className="text-lg text-[#C3A7D6]">Tools</span>
                        </div>
                    </div>
                </div>

                <br></br>
                <br></br>
                <div className="container mx-auto text-center px-4">
                    <h2 className="text-4xl font-extrabold text-[#7FB3AD] mb-8">
                        Tech Stack
                    </h2>
                    {/* sm:grid-cols-2 lg:grid-cols-3 gap-8 */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Frontend */}
                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                React.js
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div lang="en" className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                TypeScript
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                Next.js
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                Three.js
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                Tailwind CSS
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                CSS
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                HTML
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#B0C3AA]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                Javascript
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        {/* Backend */}
                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#A6C5D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                Node.js
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#A6C5D6]">
                            
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                Express.js
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#A6C5D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                MySQL: MongoDB & Amazon AWS (RDS)
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#A6C5D6]">
                            
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                RESTful APIs
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#A6C5D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                TypeScript
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        {/* Tools */}
                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#A6C5D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                Git
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#C3A7D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                GitHub
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#C3A7D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                Visual Studio Code
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#C3A7D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                Figma
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                        <div className="border border-b-gray-100 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 bg-[#C3A7D6]">
                            <h3 className="text-2xl font-semibold text-white mb-4 break-words hyphens-auto">
                                Vercel
                            </h3>
                            <p className="text-gray-900 leading-relaxed">

                            </p>
                        </div>

                    </div>
                </div>
            </section>


            {/* what I know section */}
            {/* <hr className="border-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-pulse2 mt-10 mb-10"></hr> */}

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

