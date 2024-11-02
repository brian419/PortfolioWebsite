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
        description: "A website created by Anastasia Spencer, Brooke Boskus, Lilly Eide, and Jeongbin Son for the University of Alabama's waterski team. Build using React.js, Node.js, Next.js, Express.js, and Tailwind CSS.",
        image: uawaterskihomepageImage,
        link: 'https://testing-waterski-deployment.vercel.app/',
    },
    {
        id: 2,
        title: "Code for Trees",
        description: "Solo website project built using React.js, Next.js, Node.js and Tailwind CSS. The website will eventually be developed into a platform where users can solve coding problems and come up with original solutions while gaining points in a global points system. The points can be redeemed and used to plant trees in real life. Gamification so users are encouraged to code more and plant more trees.",
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
const visibleCards = 1; 

const WebsitePage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [offset, setOffset] = useState(0); 

    useEffect(() => {
        const containerWidth = cardWidth * visibleCards;
        const calculatedOffset = (window.innerWidth - containerWidth) / 2 - (cardWidth / 2) + 120; // 50px shift to the right
        setOffset(calculatedOffset);
    }, []);

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

    const selectedWebsite = websites[currentIndex];

    return (
        <div className="flex flex-col items-center justify-start mt-[-40px] h-screen text-white relative">
            <h1 className="text-4xl font-bold mb-8">Websites</h1>

            <div className="relative w-full max-w-3xl flex items-center justify-center">
                {/* Previous Button */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 z-10 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
                    style={{ marginLeft: '-50px' }} 
                >
                    ◀
                </button>

                {/* Project Cards */}
                <div className="overflow-hidden w-full flex justify-center relative z-0">
                    <motion.div
                        className="flex"
                        animate={{ x: offset - currentIndex * cardWidth }} 
                        transition={{ type: "spring", stiffness: 50 }}
                    >
                        {websites.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className={`min-w-[300px] mx-8 transition-all ${index === currentIndex ? 'scale-110' : 'scale-90 opacity-50'
                                    }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ cursor: 'pointer' }} 
                            >
                                <div className="bg-blue text-white rounded-lg p-6 shadow-lg">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        width={500}
                                        height={500}
                                        className="rounded-t-lg"
                                    />
                                    <h2 className="text-xl font-bold mt-4">{project.title}</h2>
                                    <p className="mt-2">{project.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="absolute right-0 z-10 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
                    style={{ marginRight: '-50px' }}
                >
                    ▶
                </button>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
                {selectedWebsite.id === 1 ? ( //clicked on the first website
                    <div className="mx-auto flex w-full max-w-lg items-center justify-center mt-8">
                        <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
                            <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
                            <div className="relative z-20 flex w-full rounded-[0.60rem] bg-blue-600 p-2">
                                <a
                                    href={selectedWebsite.link}
                                    className="bg-blue-600 hover:text-black text-white text-xs font-bold py-2 px-4 rounded w-full text-center"
                                >
                                    UA Waterski Team
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (

                    selectedWebsite.id === 2 ? ( //clicked on the second website
                        <div className="mx-auto flex w-full max-w-lg items-center justify-center mt-8">
                            <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
                                <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
                                <div className="relative z-20 flex w-full rounded-[0.60rem] bg-blue-600 p-2">
                                    <a
                                        href={selectedWebsite.link}
                                        className="bg-blue-600 hover:text-black text-white text-xs font-bold py-2 px-4 rounded w-full text-center"
                                    >
                                        Code for Trees
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
                            Not Implemented Yet
                        </button>
                    )
                    
                )}
                
            </div>

        </div>
    );
};

export default WebsitePage;
