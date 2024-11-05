"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import TetrisImage from '../../components/images/tetris.svg';
import PlaceholderImage from '../../components/images/placeholderProjects.svg';
import GomokuImage from '../../components/images/gomoku.svg';

interface Project {
    id: number;
    title: string;
    description: string;
    image: StaticImageData;
    link: string;
}

const cardWidth = 340;

const ProjectPage: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const projects: Project[] = useMemo(() => [
        {
            id: 1,
            title: 'Black and White Tetris',
            description: 'A minimalist Tetris game with black and white design.',
            image: TetrisImage,
            link: '/tetris-page',
        },
        {
            id: 2,
            title: 'Gomoku',
            description: '"Five in a row" [In Progress]',
            image: GomokuImage,
            link: '/gomoku-page',
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
    ], []);

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
        <div className="flex flex-col items-center justify-start mt-[-40px] h-screen text-white relative overflow-hidden">
            <h1 className="text-4xl font-bold mb-8">Projects</h1>

            <div className="relative flex items-center justify-center w-full max-w-4xl overflow-hidden">
                {/* Previous Button */}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
                    aria-label="Previous Project"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Project Cards */}
                <motion.div
                    className="flex"
                    animate={{ x: `calc(50% - ${currentIndex * cardWidth}px - ${cardWidth / 2}px)` }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                    {projects.map((project, index) => (
                        <MemoizedProjectCard
                            key={project.id}
                            project={project}
                            isActive={index === currentIndex}
                        />
                    ))}
                </motion.div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
                    aria-label="Next Project"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <br />

            {/* Link Button */}
            <div className="mt-8">
                {selectedProject.id === 1 ? (
                    <LinkButton label="Black & White Tetris" href={selectedProject.link} />
                ) : selectedProject.id === 2 ? (
                    <LinkButton label="Gomoku" href={selectedProject.link} />
                ) : (
                    <DisabledButton label="Not Implemented Yet" />
                )}
            </div>
        </div>
    );
};

export default ProjectPage;

interface ProjectCardProps {
    project: Project;
    isActive: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive }) => (
    <motion.div
        className={`min-w-[300px] mx-8 transition-transform duration-300 ${
            isActive ? 'scale-105' : 'scale-90 opacity-50'
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
);

const MemoizedProjectCard = React.memo(ProjectCard);

interface LinkButtonProps {
    label: string;
    href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, href }) => (
    <div className="mx-auto flex w-full max-w-lg items-center justify-center mt-8">
        <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
            <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
            <div className="relative z-20 flex w-full rounded-[0.60rem] bg-blue-600 p-2">
                <a
                    href={href}
                    className="bg-blue-600 hover:text-black text-white text-xs font-bold py-2 px-4 rounded w-full text-center"
                >
                    {label}
                </a>
            </div>
        </div>
    </div>
);

interface DisabledButtonProps {
    label: string;
}

const DisabledButton: React.FC<DisabledButtonProps> = ({ label }) => (
    <button
        className="px-6 py-3 text-sm font-semibold text-center text-white bg-gray-500 rounded-lg cursor-not-allowed"
        disabled
    >
        {label}
    </button>
);
