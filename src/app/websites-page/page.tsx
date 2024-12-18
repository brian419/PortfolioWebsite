"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import uawaterskihomepageImage from '../../components/images/uawaterskihomepage.png';
import codefortreeshomepageImage from '../../components/images/codefortreeshomepage.png';
import tempWebsiteImage from '../../components/images/placeholderProjects.svg';
import snowskiImage from '../../components/images/snowskiimage.png'
import snowSkiVideo from '../../components/videos/CS330FinalProjectRecording.mp4'

interface Project {
    id: number;
    title: string;
    description: string;
    image: StaticImageData;
    link: string;
    extraInfo: string;
    video?: string; // ? makes it optional!
}

const cardWidth = 340;

const WebsitePage: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const websites: Project[] = useMemo(() => [
        {
            id: 1,
            title: "Capstone Project | Web Application for University of Alabama's Waterski Team",
            description: "A website created by Anastasia Spencer, Brooke Boskus, Lilly Eide, and Jeongbin Son for the University of Alabama's waterski team.",
            image: uawaterskihomepageImage,
            link: 'https://www.uawaterski.com',
            extraInfo: "Built using React.js, Node.js, Next.js, Express.js, and Tailwind CSS, and connected to an Amazon RDS MySQL database. The website is deployed through Vercel. My contributions include implementing secure login functionality using JWT tokens, creating a fully functional 'Contact Us' form, and developing a 'Forgot Password' page with the ability to reset passwords in the database. I also designed and implemented the 'Roster' page, which allows users to view team members from the database, with search and filter capabilities for enhanced usability. I also added a Super User (admin account) that can modify content directly within the website. Currently the admin account can delete and edit users and their uploaded information, but in the future, the admin account will have the ability to confirm account creations as well as modify content (images and texts). For handling cybersecurity cases, the registration also checks to see if the user has put a valid email address (associated with the University of Alabama) and no accounts using the email exploit trick can be registered (email+1@email.com). Additionally, I implemented a verification step that sends a confirmation link in an email to the registered user, so fake emails cannot verify and therefore cannot login. In the future, I will set up a way so that the admin account can further handle verification to ensure that only the members of the waterski team can sign up for an account on the website!",
        },
        {
            id: 2,
            title: "Code for Trees",
            description: "Solo website project for solving coding problems and gaining points to plant trees.",
            image: codefortreeshomepageImage,
            link: 'https://codefortrees.org/',
            extraInfo: "This platform allows users to contribute to environmental sustainability while improving their coding skills. Built with React.js, Next.js, and Tailwind CSS.",
        },
        {
            id: 3,
            title: "Snow Ski",
            description: "This is a C#, .NET tech stack website built for CS 330 Web Development's Final Project.",
            image: snowskiImage,
            link: 'https://cs330-fall2024-finalproject.azurewebsites.net/',
            extraInfo: "NOTE: This website may not be accessible in the future as it was built using Azure's Student Plan and our group will not continue with this project since the class is over. However, in such a case, I have immortalized our project as a video!\n Built by Anastasia Spencer, Brooke Boskus, Collin Price, Owen McMenaman. Deployed through Microsoft Azure. This was built using the student plan and utilizes OpenAI and OpenWeather apis. My personal contributions for this website includes handling login and register along with email confirmation, styling the initial frontend of the website, continuation of Chat Bot improvements based on the code provided by Anastasia Spencer. This website was a great experience in exploring other ways to do web development! I also added the cybersecurity checks I implemented in the Capstone website into this 330 website as well.",
            video: snowSkiVideo,
        },
    ], []);

    const handleNext = () => {
        const nextIndex = currentIndex === websites.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
        if (selectedProject) {
            setSelectedProject(websites[nextIndex]);
        }
    };

    const handlePrev = () => {
        const prevIndex = currentIndex === 0 ? websites.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        if (selectedProject) {
            setSelectedProject(websites[prevIndex]);
        }
    };

    const handleModalOpen = (project: Project) => {
        setSelectedProject(project);
    };

    const handleModalClose = () => {
        setSelectedProject(null);
    };

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedProject]);

    return (
        <div className="mt-[-20px] flex flex-col items-center justify-start h-screen text-white relative overflow-hidden">
            {/* <h1 className="text-4xl font-bold mb-8 mt-10">Websites</h1> */}
            <h1 className="py-10 text-6xl font-extrabold mt-10 text-[#49A097]">
                Websites
            </h1>

            <div className="relative flex items-center justify-center w-full max-w-4xl overflow-hidden">
                {/* Previous Button hidden on mobile view, visible on desktop view */}
                <button
                    onClick={handlePrev}
                    className="hidden md:flex absolute left-4 top-1/2 -mt-11 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
                    aria-label="Previous Project"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Previous Button hidden on desktop view, visible on mobile view*/}
                <button
                    onClick={handlePrev}
                    className="md:hidden absolute left-10 mt-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
                    aria-label="Previous Project"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Project Cards */}
                <motion.div
                    className="flex"
                    animate={{ x: `calc(50% - ${currentIndex * (cardWidth + 32)}px - ${cardWidth / 2}px)` }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                    {websites.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            isActive={index === currentIndex}
                            onClick={() => handleModalOpen(project)}
                        />
                    ))}
                </motion.div>

                {/* Next Button hidden on mobile view */}
                <button
                    onClick={handleNext}
                    className="hidden md:flex absolute right-4 top-1/2 -mt-11 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
                    aria-label="Next Project"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Next Button hidden on desktop view */}
                <button
                    onClick={handleNext}
                    className="md:hidden absolute right-10 mt-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
                    aria-label="Next Project"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                
            </div>

            {/* Link Button */}
            <div className="mt-8">
                {websites[currentIndex].id === 1 ? (
                    <LinkButton label="UA Waterski Team" href={websites[currentIndex].link} />
                ) : websites[currentIndex].id === 2 ? (
                    <LinkButton label="Code for Trees" href={websites[currentIndex].link} />
                ) : websites[currentIndex].id === 3 ? (
                    <LinkButton label="Snow Ski" href={websites[currentIndex].link} />
                ) : (
                    <DisabledButton label="Not Implemented Yet" />
                )}
            </div>

            {/* Modal */}
            {selectedProject && (
                <Modal
                    project={selectedProject}
                    onClose={handleModalClose}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}
        </div>
    );
};


export default WebsitePage;

interface ProjectCardProps {
    project: Project;
    isActive: boolean;
    onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive, onClick }) => (
    <motion.div
        onClick={onClick}
        className={`min-w-[300px] mx-8 transition-transform duration-300 ${isActive ? 'scale-105' : 'scale-90 opacity-50'}`}
    >
        <div className="relative perspective bg-gray-800 text-white rounded-lg p-6 shadow-2xl transform transition-transform duration-300 hover:scale-105">
            <Image
                src={project.image}
                alt={project.title}
                width={300}
                height={200}
                className="rounded-t-lg object-cover"
            />
            <h2 className="text-xl font-bold mt-4 text-blue-400">{project.title}</h2>
            <div className="border-b border-gray-400 my-4"></div>
            <p className="mt-2 text-white">{project.description}</p>
        </div>
    </motion.div>
);

interface ModalProps {
    project: Project;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

const Modal: React.FC<ModalProps> = ({ project, onClose, onPrev, onNext }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        {/* Wrapper for Modal and Arrows */}
        <div className="relative flex justify-center items-center w-full h-full">

            {/* left arrow button only shown on desktop view, hidden on mobile view */}
            <button
                onClick={onPrev}
                className="hidden md:flex absolute left-72 mt-5 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
                aria-label="Previous Project"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* left arrow button only shown on mobile view, hidden on desktop view */}
            <button
                onClick={onPrev}
                className="md:hidden absolute left-10 mt-80 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
                aria-label="Previous Project"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>


            {/* Modal Content */}
            <div className="bg-gray-900 text-white p-6 rounded-lg max-w-lg w-full relative border border-gray-400">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                    aria-label="Close Modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Display video if it exists */}
                {project.video && (
                    <div className="mt-4">
                        <video controls autoPlay className="w-full rounded-lg">
                            <source src={project.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}

                {/* Modal Content */}
                <h2 className="text-xl font-bold mt-4 text-blue-400">{project.title}</h2>
                <div className="border-b border-gray-400 my-4"></div>
                <div className="mt-2 text-white max-h-64 overflow-y-auto pr-2 space-y-4">
                    {project.extraInfo.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="leading-relaxed text-gray-300">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Visit Website */}
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-transparent text-blue-500 py-2 px-4 rounded hover:underline text-center w-full"
                >
                    Visit the Website!
                </a>
            </div>

            {/* right arrow button only shown on desktop view, hidden on mobile view */}
            <button
                onClick={onNext}
                className="hidden md:flex absolute right-72 mt-5 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
                aria-label="Next Project"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* right arrow button only shown on mobile view, hidden on desktop view */}
            <button
                onClick={onNext}
                className="md:hidden absolute right-10 mt-80 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
                aria-label="Previous Project"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
);


interface LinkButtonProps {
    label: string;
    href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, href }) => (
    <div className="mx-auto flex w-full max-w-lg items-center justify-center mt-0">
        <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
            <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
            <div className="relative z-20 flex w-full rounded-[0.60rem] bg-blue-600 p-2">
                <a
                    href={href}
                    target='_blank'
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

