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
    const fakeText = "឵" // using U+17B5 KHMER VOWEL INHERENT AA 
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
                return 'text-5xl font-extrabold mb-6 text-[#49A097] text-center';

            default:
                return 'text-5xl text-transparent text-center';
                // goal is to display a fake sentence that's not visible to the eye that is also not clickable

        }
    };
    
    return (

        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8" style={{ minHeight: '3rem' }}> 
            <p id={id} className={getClassName()} style={{ whiteSpace: 'pre-line', cursor: 'none', display: 'inline-block' }}>
                {displayedText || fakeText}
            </p>
        </div>
    );
};

export default Typewriter;