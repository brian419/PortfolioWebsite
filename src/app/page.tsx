"use client";
import CursorEffect from '../components/CursorEffect';
import GalaxyScene from '../components/GalaxyScene';
import { useState, useEffect } from 'react';
import TypeWriterEffect from '../components/Typewriter';
import RainbowTextEffect from '../components/RainbowText';

export default function Home() {
    const [isOutsideGalaxy, setIsOutsideGalaxy] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const handleMouseOver = (e: MouseEvent) => {
        const galaxySection = document.getElementById('galaxy');
        if (galaxySection) {
            const boundingRect = galaxySection.getBoundingClientRect();
            const isInside =
                e.clientX >= boundingRect.left &&
                e.clientX <= boundingRect.right &&
                e.clientY >= boundingRect.top &&
                e.clientY <= boundingRect.bottom;

            setIsOutsideGalaxy(!isInside);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseOver);
        return () => {
            window.removeEventListener('mousemove', handleMouseOver);
        };
    }, []);

    const handleScroll = () => {
        const galaxySection = document.getElementById('galaxy');
        if (galaxySection) {
            setShowScrollTop(true);
        } else {
            setShowScrollTop(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <CursorEffect />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="text-white py-28">
                    <div className="container mx-auto text-center flex flex-col justify-center items-center min-h-[70vh] space-y-12">
                        <TypeWriterEffect id="home-page-intro-text" text="Building Interactive Web Applications"/>
                        {/* <p className="text-2xl mb-12 text-gray-300 max-w-3xl mx-auto animate-rainbow">
                            I am a web developer with experience in React, Next.js, Node.js and other tech stacks. I love building web applications and am always practicing to improve as a software developer. Explore my website and read upon / interact with my projects, skills, and more!
                        </p> */}
                        <RainbowTextEffect text="I am a web developer with experience in React, Next.js, Node.js and other tech stacks. I love building web applications and am always practicing to improve as a software developer. Explore my website and read upon / interact with my projects, skills, and more!" />

                        {/* Horizontal Line */}
                        <div className="w-full border-t-4 border-transparent border-solid"></div>

                        <div className="space-x-10 flex">
                            <div className="animate-bounce">
                                <a
                                    href="/projects-page"
                                    className="bg-[#15ad9e] text-white px-8 py-4 rounded-full hover:bg-[#3d857c] transition duration-300"
                                >
                                    Projects
                                </a>
                            </div>
                            <div className="animate-bounce2">
                                <a
                                    href="/websites-page"
                                    className="bg-[#15ad9e] text-white px-8 py-4 rounded-full hover:bg-[#3d857c] transition duration-300"
                                >
                                    Websites
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Horizontal Line */}
                {/* <div className="w-full border-t-4 border-[#49A097] border-solid"></div> */}

                {/* Projects Section */}
                {/* <section id="projects" className="py-20 bg-gray-100 text-gray-800">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-[#49A097]">
                            My Projects
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            Here, you’ll find a selection of my work that demonstrates my
                            skills in web development.
                        </p>
                    </div>
                </section> */}

                {/* Horizontal Line */}
                {/* <div className="w-full border-t-4 border-[#49A097]"></div> */}

                {showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-5 right-5 bg-[#49A097] text-white p-3 rounded-full shadow-lg hover:bg-[#3d857c] transition duration-300">
                        ↑
                    </button>
                )}


                {/* Embed Three.js Galaxy Scene */}
                <section id="galaxy" className="h-screen">
                    <GalaxyScene />
                </section>

            </main>
        </div>
    );
}
