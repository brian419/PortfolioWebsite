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
                {/* Home Page, Welcome Section */}
                <section className="text-white py-28">
                    <div className="container mx-auto text-center flex flex-col justify-center items-center min-h-[70vh] space-y-12">
                        <TypeWriterEffect id="home-page-intro-text" text="Building Interactive Web Applications"/>
                        
                        <RainbowTextEffect text="I'm a web developer passionate about creating dynamic and engaging web applications using technologies like React, Next.js, Node.js, and more. I love building web applications and aspire to deliver innovative solutions while growing as a software developer. Explore my portfolio to discover my projects, skills, and creative journey!" />

                        {/* Horizontal Line */}
                        <div className="w-full border-t-4 border-transparent border-solid"></div>

                        <div className="space-x-10 flex">
                            {/* taking out animate-bounce for now from className. Personally, it's a bit too much happening with movement on the homepage */}
                            <div className="">
                                <a
                                    href="/projects-page"
                                    className="bg-[#15ad9e] text-white px-8 py-4 rounded-full hover:bg-[#3d857c] transition duration-300"
                                >
                                    Projects
                                </a>
                            </div>
                            {/* taking out animate-bounce2 for now from className */}
                            <div className="">
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
