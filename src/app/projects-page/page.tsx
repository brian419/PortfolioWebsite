"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import TetrisImage from '../../components/images/tetris.svg';
import PlaceholderImage from '../../components/images/placeholderProjects.svg';
import GomokuImage from '../../components/images/gomoku.svg';
import proceduralProjectImage from '../../components/images/delete.png'
import seaSceneImage from '../../components/images/seasceneimage.png'


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
            title: 'The Sea',
            description: 'This will be a test project for using Three.js and learning procedural generations.',
            image: seaSceneImage,
            link: '/sea-page',
        },
        {
            id: 4,
            title: 'Advanced Procedural Terrain',
            description: 'This will be an ongoing test project for a more advanced project for procedural terrain generation with Three.js.',
            image: proceduralProjectImage,
            link: '/procedural-terrain-page',
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
        <div className="mb-32 min-h-screen flex flex-col items-center justify-start h-screen text-white relative">
            {/* <h1 className="text-4xl font-bold mb-8 mt-10">Projects</h1> */}
            {/* <h1 className="py-10 text-6xl font-extrabold mt-10 text-[#49A097]">
                Projects
            </h1> */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#49A097] to-[#1D976C] mb-6 shadow-xl p-4">
                        Projects
                    </h1>
                    {/* <p className="text-lg text-white max-w-3xl mx-auto">
                        Figure out some message to put here
                    </p> */}
                </div>
            </section>

            <div className="relative flex items-center justify-center w-full max-w-4xl h-auto ">
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
                <div className="relative flex items-center justify-center w-full h-full overflow-x-hidden">
                    <motion.div
                        className="flex"
                        animate={{ x: `calc(50% - ${currentIndex * (cardWidth + 32)}px - ${cardWidth / 2}px)` }}
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
                </div>

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
            <div className="mt-10">
                {selectedProject.id === 1 ? (
                    <LinkButton label="Black & White Tetris" href={selectedProject.link} />
                ) : selectedProject.id === 2 ? (
                    <LinkButton label="Gomoku" href={selectedProject.link} />
                ) : selectedProject.id === 3 ? (
                    <LinkButton label="Raging Seas" href={selectedProject.link} />
                ) : selectedProject.id === 4 ? (
                    <LinkButton label="Advanced Procedural Terrain" href={selectedProject.link} />
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
        className={`cursor-pointer min-w-[300px] max-w-[300px] mx-8 transition-transform duration-300 ${isActive ? 'scale-100' : 'scale-90 opacity-50'
            }`}
    >
        <div className="outline outline-green-100 max-h-32 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 space-y-4 mt-4 relative perspective bg-gray-800 text-white rounded-lg p-4 shadow-2xl transform transition-transform duration-300 border border-transparent min-h-[450px]">
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
    <div className="mx-auto flex w-full max-w-lg items-center justify-center ">
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

