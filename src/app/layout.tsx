import './globals.css';

import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Portfolio Website',
    description: 'Jeongbin Sonapos;s portfolio website.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={dmSans.className}>
                <div className='min-h-screen flex flex-col'>
                    <Navbar />
                    <div className='flex-grow'>
                        {children}
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}

