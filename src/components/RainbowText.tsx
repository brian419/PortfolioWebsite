import React from 'react';

interface RainbowTextProps {
    text: string;
}

const RainbowText: React.FC<RainbowTextProps> = ({ text }) => {
    return (
        <p className="text-2xl mb-12 text-gray-300 max-w-3xl mx-auto font-bold">
            {text.split('').map((char, index) => (
                <span key={index} className="animate-rainbow" style={{ animationDelay: `${index * 0.1}s` }}>
                    {char}
                </span>
            ))}
        </p>
    );
};

export default RainbowText;