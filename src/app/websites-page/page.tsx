"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import uawaterskihomepageImage from '../../components/images/uawaterskihomepage.png';
import codefortreeshomepageImage from '../../components/images/codefortreeshomepage.png';
import tempWebsiteImage from '../../components/images/placeholderProjects.svg';

const websites = [
    {
        id: 1,
        title: "Capstone Project | Web Application for University of Alabama's Waterski Team",
        description: "A website created by Anastasia Spencer, Brooke Boskus, Lilly Eide, and Jeongbin Son for the University of Alabama's waterski team. Built using React.js, Node.js, Next.js, Express.js, and Tailwind CSS.",
        image: uawaterskihomepageImage,
        link: 'https://testing-waterski-deployment.vercel.app/',
    },
    {
        id: 2,
        title: "Code for Trees",
        description: "Solo website project built using React.js, Next.js, Node.js, and Tailwind CSS. The website will eventually be developed into a platform where users can solve coding problems and gain points, redeemable to plant trees.",
        image: codefortreeshomepageImage,
        link: 'https://codefortrees.org/',
    },
    {
        id: 3,
        title: "Future Website",
        description: "This is a placeholder for a future website project.",
        image: tempWebsiteImage,
        link: '/',
    },
];

const cardWidth = 340;

const WebsitePage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === websites.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? websites.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="flex flex-col items-center justify-start mt-[-40px] h-screen text-white relative">
            <h1 className="text-4xl font-bold mb-8">Websites</h1>

            <div className="relative flex items-center justify-center w-full max-w-4xl">
                {/* Previous Button */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg"
                >
                    ◀
                </button>

                {/* Project Cards */}
                <motion.div
                    className="flex"
                    animate={{ x: `calc(50% - ${currentIndex * cardWidth}px - ${cardWidth / 2}px)` }}
                    transition={{ type: "spring", stiffness: 50 }}
                >
                    {websites.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`min-w-[300px] mx-8 transition-transform duration-300 ${index === currentIndex ? 'scale-105' : 'scale-90 opacity-50'
                                }`}
                        >
                            <div className="bg-gray-800 text-white rounded-lg p-6 shadow-2xl transform transition-transform duration-300 hover:scale-105">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={300}
                                    height={200}
                                    className="rounded-t-lg object-cover"
                                />
                                <h2 className="text-xl font-bold mt-4 text-blue-400">{project.title}</h2>
                                <p className="mt-2 text-gray-300">{project.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="absolute right-0 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg"
                >
                    ▶
                </button>
            </div>
            <br />

            {/* Link Button */}
            <div className="mt-8">
                {websites[currentIndex].id === 1 ? (
                    <div className="mx-auto flex w-full max-w-lg items-center justify-center mt-8">
                        <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
                            <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
                            <div className="relative z-20 flex w-full rounded-[0.60rem] bg-blue-600 p-2">
                                <a
                                    href={websites[currentIndex].link}
                                    className="bg-blue-600 hover:text-black text-white text-xs font-bold py-2 px-4 rounded w-full text-center"
                                >
                                    UA Waterski Team
                                </a>
                            </div>
                        </div>
                    </div>
                ) : websites[currentIndex].id === 2 ? (
                    <div className="mx-auto flex w-full max-w-lg items-center justify-center mt-8">
                        <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
                            <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
                            <div className="relative z-20 flex w-full rounded-[0.60rem] bg-blue-600 p-2">
                                <a
                                    href={websites[currentIndex].link}
                                    className="bg-blue-600 hover:text-black text-white text-xs font-bold py-2 px-4 rounded w-full text-center"
                                >
                                    Code for Trees
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        className="px-6 py-3 text-sm font-semibold text-center text-white bg-gray-500 rounded-lg cursor-not-allowed"
                        disabled
                    >
                        Not Implemented Yet
                    </button>
                )}
            </div>
        </div>
    );
};

export default WebsitePage;
