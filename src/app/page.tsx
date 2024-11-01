"use client";
import GalaxyScene from '../components/GalaxyScene';
import { useState, useEffect } from 'react';

export default function Home() {
    const [showScrollTop, setShowScrollTop] = useState(false);

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
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="text-white py-28">
                    <div className="container mx-auto text-center flex flex-col justify-center items-center min-h-[70vh]">
                        <h1 className="text-6xl font-extrabold mb-6 text-[#49A097]">
                            Welcome to My Portfolio TESTING SUBDOMAIN FOR DEVELOPMENT BRANCH TEST 4
                        </h1>
                        <p className="text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
                            I am a web developer specializing in React.js, Next.js, and Three.js. I create interactive and performant web applications.
                        </p>
                        <a
                            href="/projects-page"
                            className="animate-bounce bg-[#49A097] text-white px-8 py-4 rounded-full hover:bg-[#3d857c] transition duration-300"
                        >
                            View My Projects
                        </a>
                    </div>
                </section>

                {/* Horizontal Line */}
                <div className="w-full border-t-4 border-[#49A097] border-solid"></div>

                {/* Projects Section */}
                <section id="projects" className="py-20 bg-gray-100 text-gray-800">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-[#49A097]">
                            My Projects
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            Here, you’ll find a selection of my work that demonstrates my
                            skills in web development.
                        </p>
                        {/* Placeholder for my projects */}
                    </div>
                </section>

                {/* Horizontal Line */}
                <div className="w-full border-t-4 border-[#49A097]"></div>

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
