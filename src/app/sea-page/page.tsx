// SeaPage.tsx

"use client";
import SeaScene from '../../components/SeaScene';
import { useState, useEffect } from 'react';

export default function SeaPage() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    const handleScroll = () => {
        const seaSection = document.getElementById('sea');
        if (seaSection && window.scrollY > 100) {
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
                {/* Sea Section */}
                <section id="sea" className="py-20 relative">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-[#49A097]">
                            The Sea
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            This will be a project to learn procedural generation using fragment/vertex shaders in Three.js.
                        </p>
                        {showScrollTop && (
                            <button
                                onClick={scrollToTop}
                                className="fixed bottom-5 right-5 bg-[#49A097] text-white p-3 rounded-full shadow-lg hover:bg-[#3d857c] transition duration-300">
                                ↑
                            </button>
                        )}
                        <div className="w-full h-[100vh] overflow-hidden relative mx-auto">
                            <SeaScene />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
