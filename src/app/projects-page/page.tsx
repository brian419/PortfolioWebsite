"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import TetrisImage from '../../components/images/tetris.svg';
import PlaceholderImage from '../../components/images/placeholderproject.svg';

const projects = [
    {
        id: 1,
        title: 'Black and White Tetris',
        description: 'A minimalist Tetris game with black and white design.',
        image: TetrisImage,
        link: '/tetris-page',
    },
    {
        id: 2,
        title: 'Placeholder Project 2',
        description: 'Placeholder description 2.',
        image: PlaceholderImage,
        link: '',
    },
    {
        id: 3,
        title: 'Placeholder Project 3',
        description: 'Placeholder description 3.',
        image: PlaceholderImage,
        link: '',
    },
    {
        id: 4,
        title: 'Placeholder Project 4',
        description: 'Placeholder description 4.',
        image: PlaceholderImage,
        link: '',
    }
];

const cardWidth = 340; // larger screens card width
const mobileCardWidth = 250; // mobile screens card width
const visibleCards = 1;

const ProjectPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [offset, setOffset] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // layout on resize
    useEffect(() => {
        const updateLayout = () => {
            const isMobileScreen = window.innerWidth <= 768; // 768px is the breakpoint for mobile
            setIsMobile(isMobileScreen);

            const cardWidthToUse = isMobileScreen ? mobileCardWidth : cardWidth;
            const containerWidth = cardWidthToUse * visibleCards;
            const calculatedOffset =
                (window.innerWidth - containerWidth) / 2 - cardWidthToUse / 2 + 120;
            setOffset(calculatedOffset);
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);

        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? projects.length - 1 : prevIndex - 1
        );
    };

    const selectedProject = projects[currentIndex];

    return (
        <div className="flex flex-col items-center justify-start mt-[-40px] h-screen text-white relative">
            <h1 className="text-4xl font-bold mb-8">Projects</h1>

            <div className="relative w-full max-w-3xl flex items-center justify-center">
                {/* Previous Button */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 z-10 bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition"
                    style={{ marginLeft: '-80px' }} 
                >
                    ◀
                </button>

                {/* Project Cards */}
                <div className="overflow-hidden w-full flex justify-center relative z-0">
                    <motion.div
                        className="flex"
                        animate={{ x: offset - currentIndex * (isMobile ? mobileCardWidth : cardWidth) }}
                        transition={{ type: 'spring', stiffness: 50 }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className={`min-w-[${isMobile ? '250px' : '300px'}] mx-4 transition-all ${
                                    index === currentIndex ? 'scale-110' : 'scale-90 opacity-50'
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
                                        width={isMobile ? 250 : 300}
                                        height={isMobile ? 180 : 200}
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
                    className="absolute right-0 z-10 bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition"
                    style={{ marginRight: '-80px' }} 
                >
                    ▶
                </button>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
                {selectedProject.id === 1 ? (
                    <div className="mx-auto flex w-full max-w-lg items-center justify-center mt-8">
                        <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
                            <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
                            <div className="relative z-20 flex w-full rounded-[0.60rem] bg-blue-600 p-2">
                                <a
                                    href={selectedProject.link}
                                    className="bg-blue-600 hover:text-black text-white text-xs font-bold py-2 px-4 rounded w-full text-center"
                                >
                                    Black & White Tetris
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
                        Not Implemented Yet
                    </button>
                )}
            </div>

        </div>
    );
};

export default ProjectPage;
