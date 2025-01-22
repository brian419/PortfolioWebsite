import React from 'react';

interface RainbowTextProps {
    text: string;
}

// for span element, I have used index * 0.1s before. 
// index * 0.5s is really slow
// so I chose to use index * 0.01s for now, where it's the fastest speed of colors
const RainbowText: React.FC<RainbowTextProps> = ({ text }) => {
    return (
        <p className="pointer-events-none text-2xl mb-12 text-gray-300 max-w-3xl mx-auto font-bold">
            {text.split('').map((char, index) => (
                <span key={index} className="animate-rainbow" style={{ animationDelay: `${index * 0.01}s`, color: '#6B7280' }}>
                    {char}
                </span>
            ))}
        </p>
    );
};

export default RainbowText;