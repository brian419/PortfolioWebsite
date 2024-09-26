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
        link: '/tetris-page', // Tetris project link
    },
    {
        id: 2,
        title: 'Placeholder Project 2',
        description: 'Placeholder description 2.',
        image: PlaceholderImage,
        link: '', // No link for now
    },
    {
        id: 3,
        title: 'Placeholder Project 3',
        description: 'Placeholder description 3.',
        image: PlaceholderImage,
        link: '', // No link for now
    },
    {
        id: 4,
        title: 'Placeholder Project 4',
        description: 'Placeholder description 4.',
        image: PlaceholderImage,
        link: '', // No link for now
    },
];

const cardWidth = 340; // Set the width of the card to help in precise movement
const visibleCards = 1; // Only the centered card should be fully visible

const ProjectPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [offset, setOffset] = useState(0); // Offset for centering the first card

    // Calculate initial offset to center the first card
    useEffect(() => {
        const containerWidth = cardWidth * visibleCards;
        const calculatedOffset = (window.innerWidth - containerWidth) / 2 - (cardWidth / 2);
        setOffset(calculatedOffset);
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
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white relative">
            <h1 className="text-4xl font-bold mb-8">Projects</h1>

            <div className="relative w-full max-w-3xl flex items-center justify-center">
                {/* Previous Button */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 z-10 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
                    style={{ marginLeft: '-50px' }} // Move the button further to the left to avoid overlap
                >
                    ◀
                </button>

                {/* Project Cards */}
                <div className="overflow-hidden w-full flex justify-center relative z-0">
                    <motion.div
                        className="flex"
                        animate={{ x: offset - currentIndex * cardWidth }} // Centering logic
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className={`min-w-[300px] mx-4 transition-all ${index === currentIndex ? 'scale-110' : 'scale-90 opacity-50'
                                    }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ cursor: 'pointer' }} // Make cards clickable
                            >
                                <div className="bg-blue text-white rounded-lg p-6 shadow-lg">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        width={300}
                                        height={200}
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
                    style={{ marginRight: '-50px' }} // Move the button further to the right to avoid overlap
                >
                    ▶
                </button>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
                {selectedProject.id === 1 ? ( // Only show the button for the Tetris project
                    <a href={selectedProject.link} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        Go to Tetris Page
                    </a>
                ) : (
                    <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
                        No Link Available
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProjectPage;
