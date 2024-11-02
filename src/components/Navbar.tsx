"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-900 p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Hamburger Icon for navbar */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop Navigation Links (hidden on mobile) */}
                <div className="hidden md:flex space-x-8">
                    <Link href="/" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        My Portfolio
                    </Link>
                    <Link href="/about-me-page" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        About Me
                    </Link>
                    <Link href="/projects-page" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        Projects
                    </Link>
                    <Link href="/websites-page" className="block text-white text-lg hover:text-gray-400 transition duration-300">
                        Websites
                    </Link>
                    <Link href="/contact-page" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        Contact
                    </Link>
                </div>

                <div>
                    <span className="text-white text-lg animate-pulse">Jeongbin Son</span>
                </div>
            </div>

            {/* Mobile Menu Links (visible only when open) */}
            <div className={`md:hidden ${isOpen ? "block" : "hidden"} mt-2 space-y-4`}>
                <Link href="/" className="block text-white text-lg hover:text-gray-400 transition duration-300">
                    My Portfolio
                </Link>
                <Link href="/about-me-page" className="block text-white text-lg hover:text-gray-400 transition duration-300">
                    About Me
                </Link>
                <Link href="/projects-page" className="block text-white text-lg hover:text-gray-400 transition duration-300">
                    Projects
                </Link>
                <Link href="/websites-page" className="block text-white text-lg hover:text-gray-400 transition duration-300">
                    Websites
                </Link>
                <Link href="/contact-page" className="block text-white text-lg hover:text-gray-400 transition duration-300">
                    Contact
                </Link>
            </div>
        </nav>
    );
}
