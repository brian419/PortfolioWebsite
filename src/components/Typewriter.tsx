/**
 * Typewriter component for home page effect
 */

import { useEffect, useState } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number;
    id: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 100, id }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        let interval: NodeJS.Timeout | null = null;

        const startTyping = () => {
            interval = setInterval(() => {
                setDisplayedText(text.slice(0, index + 1));
                index++;
                if (index === text.length) {
                    clearInterval(interval as NodeJS.Timeout);
                    setTimeout(() => {
                        index = 0;
                        setDisplayedText('');
                        startTyping(); // restart the animation
                    }, 5000); // the delay before restarting the animation
                }
            }, speed);
        };

        startTyping();

        return () => clearInterval(interval as NodeJS.Timeout);
    }, [text, speed]);

    const getClassName = () => {
        switch (id) {
            case 'home-page-intro-text':
                return 'text-6xl font-extrabold mb-6 text-[#49A097]';
            // case 'home-page-extra-text':
            //     return 'text-2xl mb-12 text-gray-300 max-w-3xl mx-auto';
            default:
                return '';
        }
    };

    return (
        <div style={{ minHeight: '3rem' }}> 
            <p id={id} className={getClassName()} style={{ whiteSpace: 'pre-line' }}>
                {displayedText}
            </p>
        </div>
    );
};

export default Typewriter;