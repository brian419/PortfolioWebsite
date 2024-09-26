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

// Create an empty grid (10x20)
const createGrid = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

// Generate a random Tetromino
const randomTetromino = () => {
    const tetrominos = 'IOTZSJL';
    const randomIndex = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randomIndex as keyof typeof TETROMINOS];
};

const TetrisPage = () => {
    const [grid, setGrid] = useState(createGrid()); // The game grid
    const [currentTetromino, setCurrentTetromino] = useState(randomTetromino); // Active Tetromino
    const [position, setPosition] = useState({ x: COLS / 2 - 2, y: 0 }); // Tetromino position
    const [gameOver, setGameOver] = useState(false); // Game over state

    // Check if Tetromino collides with the grid boundaries or other blocks
    const collides = (x: number, y: number, tetromino: number[][]) => {
        for (let row = 0; row < tetromino.length; row++) {
            for (let col = 0; col < tetromino[row].length; col++) {
                if (tetromino[row][col] !== 0) {
                    const newX = x + col;
                    const newY = y + row;
                    if (newY >= ROWS || newX < 0 || newX >= COLS || (grid[newY] && grid[newY][newX] !== 0)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    // Place Tetromino on the grid and stack it when it hits something
    const placeTetromino = () => {
        const newGrid = [...grid];
        currentTetromino.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0 && position.y + y < ROWS) {
                    newGrid[position.y + y][position.x + x] = value;
                }
            });
        });
        setGrid(newGrid);
        checkForCompleteLines(newGrid); // Clear lines if any are complete
    };

    // Clear completed lines from the grid
    const checkForCompleteLines = (grid: number[][]) => {
        const newGrid = grid.filter((row) => row.some((cell) => cell === 0)); // Keep incomplete rows
        const rowsCleared = ROWS - newGrid.length;
        const emptyRows = Array.from({ length: rowsCleared }, () => Array(COLS).fill(0)); // Add new empty rows at the top
        setGrid([...emptyRows, ...newGrid]); // Update grid
    };

    // Move Tetromino down
    const moveDown = () => {
        if (!collides(position.x, position.y + 1, currentTetromino)) {
            setPosition((prev) => ({ ...prev, y: prev.y + 1 }));
        } else {
            placeTetromino(); // Place Tetromino when it hits something
            if (position.y <= 0) {
                setGameOver(true); // Game over if Tetromino can't be placed
            } else {
                setCurrentTetromino(randomTetromino()); // Spawn new Tetromino
                setPosition({ x: COLS / 2 - 2, y: 0 }); // Reset position
            }
        }
    };

    // Move Tetromino left or right
    const move = (dir: number) => {
        if (!collides(position.x + dir, position.y, currentTetromino)) {
            setPosition((prev) => ({ ...prev, x: prev.x + dir }));
        }
    };

    // Rotate Tetromino (90 degrees clockwise)
    const rotate = () => {
        const rotatedTetromino = currentTetromino[0].map((_, index) =>
            currentTetromino.map((col) => col[index]).reverse()
        );
        if (!collides(position.x, position.y, rotatedTetromino)) {
            setCurrentTetromino(rotatedTetromino);
        }
    };

    // Handle key presses (left, right, down, rotate)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowLeft') {
            move(-1); // Move left
        } else if (e.key === 'ArrowRight') {
            move(1); // Move right
        } else if (e.key === 'ArrowDown') {
            moveDown(); // Soft drop (faster movement down)
        } else if (e.key === 'ArrowUp') {
            rotate(); // Rotate
        }
    };

    // Render the Tetromino on the grid
    const renderGrid = () => {
        const newGrid = createGrid();
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

    // Automatically move Tetromino down every second
    useEffect(() => {
        const interval = setInterval(() => {
            if (!gameOver) moveDown();
        }, 1000);
        return () => clearInterval(interval);
    }, [position, gameOver]);

    return (
        <div
            className="h-screen overflow-hidden flex flex-col items-center justify-center bg-gray-900 text-white"
            tabIndex={0} // Make div focusable for key events
            onKeyDown={handleKeyDown}
        >
            <h1 className="text-4xl font-bold mb-4">Black and White Tetris</h1>
            {gameOver ? (
                <h2 className="text-3xl">Game Over!</h2>
            ) : (
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
            )}
        </div>
    );
};

export default TetrisPage;
