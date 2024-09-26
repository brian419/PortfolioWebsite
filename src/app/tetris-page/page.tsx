"use client";

import React, { useState } from 'react';

const TetrisPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-4">Black and White Tetris</h1>
            <div className="w-full h-full flex items-center justify-center">
                <div className="game-container bg-black text-white p-4 rounded-lg shadow-lg">
                    {/* Tetris Game Logic Will Go Here */}
                    <p className="text-center">Tetris game will be implemented here.</p>
                </div>
            </div>
        </div>
    );
};

export default TetrisPage;
