"use client";

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-gray-900 p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Photo / Logo */}
                {/* Navigation Links */}
                <div className="space-x-8">
                    <Link href="/" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        My Portfolio
                    </Link>
                    <Link href="/about-me-page" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        About Me
                    </Link>
                    <Link href="/projects-page" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        Projects
                    </Link>
                    <Link href="/contact-page" className="text-white text-lg hover:text-gray-400 transition duration-300">
                        Contact
                    </Link>
                </div>
                {/* <div>
                    <Link href="/login-page" className="bg-white-500 text-white text-lg py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                        Login
                    </Link>
                </div> */}
            </div>
        </nav>
    );
}
