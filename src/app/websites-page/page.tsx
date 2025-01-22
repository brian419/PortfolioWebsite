"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import uawaterskihomepageImage from '../../components/images/uawaterskihomepage.png';
import codefortreeshomepageImage from '../../components/images/codefortreeshomepage.png';
// import tempWebsiteImage from '../../components/images/placeholderProjects.svg';
import snowskiImage from '../../components/images/snowskiimage.png'
// import snowSkiVideo from '../../../public/videos/CS330FinalProjectRecording.mp4';
const snowSkiVideo = '/videos/CS330FinalProjectRecording.mp4';
import infoCircleSVG from '../../components/images/info-circle-svgrepo-com.svg';

//readme stuff
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

interface Project {
    id: number;
    title: string;
    description: string;
    image: StaticImageData;
    link: string;
    extraInfo: string;
    video?: string; // '?' makes it optional
    readmePath?: string;
}

const cardWidth = 340;

const WebsitePage: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isExtraInfoActive, setIsExtraInfoActive] = useState(false);
    const [readmeContent, setReadmeContent] = useState<string | null>(null);

    const websites: Project[] = useMemo(() => [
        {
            id: 1,
            title: "Capstone Project | Web Application for University of Alabama's Waterski Team",
            description: "A website created by Anastasia Spencer, Brooke Boskus, Lilly Eide, and Jeongbin Son for the University of Alabama's waterski team.",
            image: uawaterskihomepageImage,
            link: 'https://www.uawaterski.com',
            extraInfo: `
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 class="text-lg font-bold text-[#52c77a]">Technologies Used:</h3>
                    <p>Built using <strong>React.js</strong>, <strong>Node.js</strong>, <strong>Next.js</strong>, <strong>Express.js</strong>, and <strong>Tailwind CSS</strong>, and connected to an Amazon RDS MySQL database. The website is deployed through Vercel.</p>
                    <br>
                    <h3 class="text-lg font-bold text-[#52c77a]">My Contributions:</h3>
                    <ul class="list-disc list-inside">
                        <li>Implementing secure login functionality using JWT tokens</li>
                        <li>Creating a fully functional 'Contact Us' form</li>
                        <li>Developing a 'Forgot Password' page with the ability to reset passwords in the database</li>
                        <li>Designing and implementing the 'Roster' page, which allows users to view team members from the database, with search and filter capabilities for enhanced usability</li>
                        <li>Adding a Super User (admin account) that can modify content directly within the website.
                            <ul class="list-decimal list-inside ml-4">
                                <li>Currently, an admin can delete users, edit user information (including their profile picture), as well as confirm / deny account registrations made by users.</li>
                            </ul>
                        </li>
                        <li>Created Officers Resources Page which houses different sections that help the officers of the water ski team.
                            <ul class="list-decimal list-inside ml-4">
                                <li>Implemented Manage Members section that can toggle between Roster (page) and Confirm Member Registration Page while still being on the Officer Resources Page. This allows an admin to easily have access to the member roster, allowing the admin to delete users and edit user information as mentioned previously. The admin can also switch to Confirm Member Registration which holds a list of pending users, or returns text that says there are no pending users!</li>
                                <li>Implemented Manage Notes section for officers to save notes from their meetings directly within the website. This section of the Officer Resources page currently allows an officer to delete and add new notes, but cannot edit a note afterwards currently.
                            </ul>
                        </li>
                    </ul>
                    <br>
                    <h3 class="text-lg font-bold text-[#52c77a]">Cybersecurity Measures:</h3>
                    <ul class="list-disc list-inside">
                        <li>Registration checks for valid email addresses associated with the University of Alabama</li>
                        <li>Prevention of accounts using the email exploit trick (email+1@email.com)</li>
                        <li>Verification step that sends a confirmation link in an email to the registered user</li>
                        <li>
                            Verification step that sends a confirmation link in an email to the admin user where admin can confirm or deny an account creation within the Officer Resources page.
                            <ul class="list-decimal list-inside ml-4">
                                <li>Admin is initially taken to login page where they can login to the admin account. Then I handled automatic redirection to officer resources page after they login!</li>
                            </ul>
                        </li>
                    </ul>
                    <hr style="border: 0; height: 1px; background: linear-gradient(to right, #38bdf8, #6366f1, #ec4899); margin-top: 2.5rem; margin-bottom: 2.5rem;">
                    <h3 class="text-lg font-bold text-[#52c77a]">Future Plans:</h3>
                    <ul class="list-disc list-inside">
                        <li>For the future, one of the first things I would like to focus on for this website is to allow the admin account modify texts and images within the website. Our initial set up did not have a headless CMS in mind, so I figure it would be a nice challenge to figure out a way for the admin account to change content on the website!</li>
                        <li>Additionally, I need to focus on finishing the Officer Resources Page.
                            <ul class="list-decimal list-inside ml-4">
                                <li>For the Manage Notes section, I would like to add a feature that allows the officer to edit a note after it is created.</li>
                                <li>A meeting notes section visible for logged in users (athletes) could also be a nice touch to the website. An admin could upload a note to be viewed by member type (athlete, officer)</li>
                                <li>Depth Chart will need to be implemented. Skier rankings for the waterski team. View the performance and rankings of each team member based on their recent performances. </li>
                                <li>Fundraising Addresses will need to be implemented. This can pull from Alumni Contacts as well as Roster Information. Users will have to be able to put in relative contact information, possibly within edit profile page (click on PFP on top right of Navbar if you're a user)</li>
                                <li>Alumni Contacts will need to be implemented. This will showcase contact information of Alumnis (email, phone number, relative's contact information) that can be easily accessed by officers. </li>
                            </ul>
                        </li>
                    </ul>
                    <br />
                </div>
            `,
        },
        {
            id: 2,
            title: "Snow Ski",
            description: "A C# and ASP.NET Core website built for University of Alabama's CS 330 - Web Development class.",
            image: snowskiImage,
            link: 'https://cs330-fall2024-finalproject.azurewebsites.net/',
            extraInfo: `
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 class="text-lg font-bold text-[#52c77a]">Project Overview:</h3>
                    <p>This website was built using C# and ASP.NET Core for University of Alabama's CS 330 - Web Development class at the end of the semester.</p>
                    <br>
                    <h3 class="text-lg font-bold text-[#52c77a]">Team Members:</h3>
                    <p>Built by Anastasia Spencer, Brooke Boskus, Collin Price, Owen McMenaman, and Jeongbin Son.</p>
                    <br>
                    <h3 class="text-lg font-bold text-[#52c77a]">Technologies Used:</h3>
                    <p>Deployed through Microsoft Azure, utilizing OpenAI and OpenWeather APIs.</p>
                    <br>
                    <h3 class="text-lg font-bold text-[#52c77a]">My Contributions:</h3>
                    <ul class="list-disc list-inside">
                        <li>Handled login and register functionality along with email confirmation.</li>
                        <li>Styled the initial frontend of the website.</li>
                        <li>Improved the Chat Bot based on the code provided by Anastasia Spencer.</li>
                        <li>Implemented cybersecurity checks similar to those in the Capstone website.</li>
                    </ul>
                    <br>
                    <h3 class="text-lg font-bold text-[#52c77a]">Note:</h3>
                    <p>This website may not be accessible in the future as it was built using Azure's Student Plan and our group will not continue with this project since the class is over. Even if the website is not accessible in the future, the video of the website will always be visible!</p>
                </div>
            `,
            video: snowSkiVideo,
        },
        {
            id: 3,
            title: "Code for Trees",
            description: "Solo website project for solving coding problems and gaining points to plant trees. Note: This website is under heavy construction, and many features will not be available at this time.",
            image: codefortreeshomepageImage,
            link: 'https://codefortrees.org/',
            extraInfo: `
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 class="text-lg font-bold text-[#52c77a]">Project Overview:</h3>
                    <p>This platform allows users to contribute to environmental sustainability while improving their coding skills.</p>
                    <br>
                    <h3 class="text-lg font-bold text-[#52c77a]">Technologies Used:</h3>
                    <p>Built with React.js, Next.js, and Tailwind CSS.</p>
                    <br>
                    <h3 class="text-lg font-bold text-[#52c77a]">Features:</h3>
                    <ul class="list-disc list-inside">
                        <li>To be implemented in the future!</li>
                    </ul>
                    <br>
                    <h3 class="text-lg font-bold text-[#52c77a]">My Contributions:</h3>
                    <p>This will be a solo project where I handle all aspects of development, from frontend to backend.</p>
                </div>
            `,
            readmePath: 'CodingForTrees_README.md',
        },
    ], []);

    // console.log(websites);


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
        setIsExtraInfoActive(true);
    };

    const handleModalClose = () => {
        setSelectedProject(null);
        setIsExtraInfoActive(false);
    };

    const fetchReadmeContent = async (filename: string) => {
        try {
            const response = await fetch(`/api/getReadMe?filename=${filename}`);
            const data = await response.json();
            setReadmeContent(data.content || 'Unable to fetch README content');
        } catch (error) {
            console.error('Error fetching README:', error);
            setReadmeContent('Error fetching README content.');
        }
    };

    useEffect(() => {
        if (selectedProject?.readmePath) {
            fetchReadmeContent(selectedProject.readmePath);
        } else {
            setReadmeContent(null);
        }
    }, [selectedProject]);

    return (
        <div className="mb-32 flex flex-col items-center justify-start h-screen text-white relative">
            <section className="container mx-auto px-4 pt-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#49A097] to-[#1D976C] mb-6 shadow-xl p-4">
                        Websites
                    </h1>
                    {/* <p className="text-lg text-white max-w-3xl mx-auto">
                    Figure out some message to put here
                </p> */}
                </div>
            </section>

            {/* information button */}
            <div className="p-4">
                <div className="flex items-center justify-center bg-gray-700 ">
                    <Image src={infoCircleSVG} alt="Information Circle" width={20} height={20} className="ml-4" />
                    <button
                        // onClick={() => setIsExtraInfoActive(!isExtraInfoActive)}
                        className="p-2 mr-3 rounded-lg text-white ml-2 pointer-events-none"
                    >
                        {/* {isExtraInfoActive ? "Close Extra Info" : "Click on a website card to read more information!"} */}
                        Click on a website card to view more details about the website!
                    </button>
                </div>
                <br />
            </div>

            {/* min-height: calc(100% + 40px); */}
            <div className="relative flex items-center justify-center w-full max-w-4xl h-auto ">

                {/* Left Arrow for Desktop View*/}
                {!isExtraInfoActive && (
                    <button
                        onClick={handlePrev}
                        className="outline outline-white hidden md:flex absolute left-4 top-1/2 -mt-11 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 "
                        aria-label="Previous Project"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}


                {/* Project Cards */}
                <div className="relative flex items-center justify-center w-full h-full overflow-x-hidden">
                    <motion.div
                        className="flex"
                        animate={{ x: `calc(50% - ${currentIndex * (cardWidth + 32)}px - ${cardWidth / 2}px)` }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    >
                        {websites.map((project, index) => (
                            <WebsiteCard
                                key={project.id}
                                project={project}
                                isActive={index === currentIndex}
                                onClick={() => handleModalOpen(project)}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Right Arrow (Desktop view) */}
                {!isExtraInfoActive && (
                    <button
                        onClick={handleNext}
                        className="outline outline-white hidden md:flex absolute right-4 top-1/2 -mt-11 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 "
                        aria-label="Next Project"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}

                {/* Right Arrow (Mobile view) */}
                {!isExtraInfoActive && (
                    <button
                        onClick={handleNext}
                        className="outline outline-white md:hidden absolute right-10 mt-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
                        aria-label="Next Project"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}

                {/* Left Arrow (Mobile view) */}
                {!isExtraInfoActive && (
                    <button
                        onClick={handlePrev}
                        className="outline outline-white md:hidden absolute left-10 mt-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
                        aria-label="Previous Project"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
            </div>

            {/* link buttons to link the websites to their https link */}
            {/* issue: remove link buttons section, and the website cards are not cutt off. keep this section, website cards get cut off.  */}

            <div className="mt-10">
                {websites[currentIndex].id === 1 ? (
                    <LinkButton label="UA Waterski Team" href={websites[currentIndex].link} />
                ) : websites[currentIndex].id === 2 ? (
                    <LinkButton label="Snow Ski" href={websites[currentIndex].link} />
                ) : websites[currentIndex].id === 3 ? (
                    <LinkButton label="Code for Trees" href={websites[currentIndex].link} />
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
                    readmeContent={readmeContent}
                />
            )}
        </div>
    );
};



export default WebsitePage;

interface WebsiteCardProps {
    project: Project;
    isActive: boolean;
    onClick: () => void;
}

// scale-105 and scale-90 or scale-90 and scale-75
const WebsiteCard: React.FC<WebsiteCardProps> = ({ project, isActive, onClick }) => (
    <motion.div
        onClick={onClick}
        className={`cursor-pointer min-w-[300px] max-w-[300px] mx-8 transition-transform duration-300 ${isActive ? 'scale-100' : 'scale-90 opacity-50'}`}
    >
        <div className="outline outline-green-100 max-h-32 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 space-y-4 mt-4 relative perspective bg-gray-800 text-white rounded-lg p-4 shadow-2xl transform transition-transform duration-300 border border-transparent min-h-[450px]">
            {/* Image */}
            <Image
                src={project.image}
                alt={project.title}
                width={300}
                height={200}
                className="rounded-t-lg object-cover"
            />
            {/* Title */}
            <h2 className="text-xl font-bold mt-4 text-blue-400">{project.title}</h2>
            <div className="border-b border-gray-400 my-4"></div>
            {/* Scrollable Content */}
            {/* used to have this in the below classname for the div
            cursor-text mt-2 text-white max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 
            */}
            <div className="">
                <p>{project.description}</p>
                {/* <div dangerouslySetInnerHTML={{ __html: project.extraInfo }} /> */}
            </div>
        </div>
    </motion.div>
);


interface ModalProps {
    project: Project;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    readmeContent: string | null;
}

const Modal: React.FC<ModalProps> = ({ project, onClose, onPrev, onNext, readmeContent }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        {/* Wrapper for Modal and Arrows */}
        <div className="relative flex justify-center items-center w-full h-full">

            {/* left arrow button only shown on desktop view, hidden on mobile view */}
            {/* 1/21/25 3:46pm cst, removed mt-32 from desktop view left and right button for extra info modal */}

            <button
                onClick={onPrev}
                className="outline outline-white hidden md:flex absolute left-72 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 "
                aria-label="Previous Project"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* left arrow button only shown on mobile view, hidden on desktop view */}
            <button
                onClick={onPrev}
                className="outline outline-white md:hidden absolute left-10 mt-80 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
                aria-label="Previous Project"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>


            {/* Modal Content */}
            <div className="bg-gray-900 text-white p-6 rounded-lg max-w-lg w-full relative border border-gray-400  border-opacity-50">
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

                {/* Display readme if it exists */}
                {readmeContent && (
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 pr-2">
                        <div className="text-center text-xl font-bold text-blue-400">
                            Readme:
                        </div>
                        <ReactMarkdown>{readmeContent}</ReactMarkdown>
                    </div>
                )}


                {/* Modal Content */}
                <h2 className="text-xl font-bold mt-4 text-blue-400">{project.title}</h2>
                <div className="border-b border-gray-400 my-4"></div>
                <div className="cursor-text scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 mt-2 text-white max-h-64 overflow-y-auto pr-2 space-y-4">
                    {/* {project.extraInfo.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="leading-relaxed text-gray-300">
                            {paragraph}
                        </p>
                    ))} */}
                    {project.id === 1 ? (
                        <div
                            className="prose prose-sm prose-invert"
                            dangerouslySetInnerHTML={{ __html: project.extraInfo }}
                        />
                    ) : project.id === 2 ? (
                        <div
                            className="prose prose-sm prose-invert"
                            dangerouslySetInnerHTML={{ __html: project.extraInfo }}
                        />
                    ) : project.id === 3 ? (
                        <div
                            className="prose prose-sm prose-invert"
                            dangerouslySetInnerHTML={{ __html: project.extraInfo }}
                        />
                    ) : (
                        project.extraInfo.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="leading-relaxed text-gray-300">
                                {paragraph}
                            </p>
                        ))
                    )}
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
                className="outline outline-white hidden md:flex absolute right-72 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 "
                aria-label="Next Project"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* right arrow button only shown on mobile view, hidden on desktop view */}
            <button
                onClick={onNext}
                className="outline outline-white md:hidden absolute right-10 mt-80 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10 text-white shadow-lg opacity-80 hover:opacity-100 border-0 hover:border hover:border-white"
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

