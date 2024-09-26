"use client";

import React, { useState, useEffect } from 'react';

// Grid dimensions
const COLS = 10;
const ROWS = 20;

// Define the Tetromino shapes
const TETROMINOS = {
    I: [[1, 1, 1, 1]],
    O: [
        [1, 1],
        [1, 1],
    ],
    T: [
        [0, 1, 0],
        [1, 1, 1],
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0],
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1],
    ],
    J: [
        [1, 0, 0],
        [1, 1, 1],
    ],
    L: [
        [0, 0, 1],
        [1, 1, 1],
    ],
};

// Create an empty grid
const createGrid = () => {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};

const TetrisPage = () => {
    //const [grid, setGrid] = useState(createGrid);
    const [currentTetromino] = useState(TETROMINOS.T); //, setCurrentTetromino
    const [position, setPosition] = useState({ x: COLS / 2 - 2, y: 0 }); // Start position for Tetromino

    // Drop the Tetromino down every second
    useEffect(() => {
        const interval = setInterval(() => {
            moveDown();
        }, 1000); // Adjust the interval to control speed

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, [position]);

    // Move Tetromino down
    const moveDown = () => {
        setPosition((prev) => ({ ...prev, y: prev.y + 1 }));
    };

    // Move Tetromino left or right
    const move = (dir: number) => {
        setPosition((prev) => ({ ...prev, x: prev.x + dir }));
    };

    // Handle key presses (left, right, down)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowLeft') {
            move(-1); // Move left
        } else if (e.key === 'ArrowRight') {
            move(1); // Move right
        } else if (e.key === 'ArrowDown') {
            moveDown(); // Move down faster
        }
    };

    // Render the Tetromino on the grid
    const renderGrid = () => {
        const newGrid = createGrid();

        // Place Tetromino on the grid
        currentTetromino.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    const gridY = position.y + y;
                    const gridX = position.x + x;
                    if (gridY >= 0 && gridY < ROWS && gridX >= 0 && gridX < COLS) {
                        newGrid[gridY][gridX] = value;
                    }
                }
            });
        });

        return newGrid;
    };

    return (
        <div
            className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white"
            tabIndex={0} // Make div focusable for key events
            onKeyDown={handleKeyDown}
        >
            <h1 className="text-4xl font-bold mb-4">Black and White Tetris</h1>
            <div className="w-full h-full flex items-center justify-center">
                <div className="game-container bg-black text-white p-4 rounded-lg shadow-lg">
                    <div className="grid grid-cols-10 gap-1">
                        {renderGrid().map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`w-6 h-6 ${cell === 1 ? 'bg-white' : 'bg-gray-700'}`}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TetrisPage;
