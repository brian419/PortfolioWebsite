"use client";

import React, { useState, useEffect, useRef } from 'react';

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
    const [grid, setGrid] = useState(createGrid()); // game board
    const [currentTetromino, setCurrentTetromino] = useState(randomTetromino); // Active Tetromino
    const [position, setPosition] = useState({ x: COLS / 2 - 2, y: 0 }); // Tetromino position
    const [gameOver, setGameOver] = useState(false); // Game over state
    const [score, setScore] = useState(0); // Player score

    const containerRef = useRef<HTMLDivElement>(null); // Reference to the container div

     // Function to restart the game
    const restartGame = () => {
        setGrid(createGrid()); // Reset the game grid
        setCurrentTetromino(randomTetromino()); // Generate a new Tetromino
        setPosition({ x: COLS / 2 - 2, y: 0 }); // Reset the position
        setScore(0); // Reset the score
        setGameOver(false); // Set the game as not over
    };

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

        // Place the current Tetromino on the grid
        currentTetromino.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0 && position.y + y < ROWS) {
                    newGrid[position.y + y][position.x + x] = value; // Set the grid cell to the Tetromino value
                }
            });
        });

        setGrid(newGrid);  // Ensure grid is updated with Tetromino placed
        const linesCleared = checkForCompleteLines(newGrid);  // Check for and remove completed lines

        // Update score based on lines cleared
        updateScore(linesCleared);
    };



    // Clear completed lines from the grid and return the number of cleared rows
    const checkForCompleteLines = (grid: number[][]) => {
        const newGrid = grid.filter((row) => row.some((cell) => cell === 0)); // Keep incomplete rows
        const rowsCleared = ROWS - newGrid.length;
        const emptyRows = Array.from({ length: rowsCleared }, () => Array(COLS).fill(0)); // Add new empty rows at the top
        setGrid([...emptyRows, ...newGrid]); // Update grid
        return rowsCleared; // Return the number of lines cleared
    };

    // Update score based on the number of lines cleared
    const updateScore = (linesCleared: number) => {
        let points = 0;
        switch (linesCleared) {
            case 1:
                points = 100;
                break;
            case 2:
                points = 300;
                break;
            case 3:
                points = 500;
                break;
            case 4:
                points = 800;
                break;
            default:
                break;
        }
        setScore((prevScore) => prevScore + points);
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
                // Make sure the position and grid are reset cleanly
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
        if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
            e.preventDefault(); // no scrolling
        }
        if (e.key === 'ArrowLeft') {
            move(-1); 
        } else if (e.key === 'ArrowRight') {
            move(1); 
        } else if (e.key === 'ArrowDown') {
            moveDown(); 
        } else if (e.key === 'ArrowUp') {
            rotate(); 
        }
    };

    // Render the Tetromino on the grid
    const renderGrid = () => {
        const newGrid = createGrid();  // Create a new empty grid

        // Copy the grid state into newGrid to reflect the current state of the board
        grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    newGrid[y][x] = value; // Copy the landed Tetrominoes onto the grid
                }
            });
        });

        // Overlay the currently falling Tetromino onto the grid
        currentTetromino.forEach((row, y) => {
            row.forEach((value, x) => {
                const gridY = position.y + y;
                const gridX = position.x + x;
                if (value !== 0 && gridY >= 0 && gridY < ROWS && gridX >= 0 && gridX < COLS) {
                    newGrid[gridY][gridX] = value; // Overlay the falling Tetromino on top of the grid
                }
            });
        });

        return newGrid;  // Return the grid with the Tetromino overlay
    };

    

    // Automatically move Tetromino down every second
    useEffect(() => {
        const interval = setInterval(() => {
            if (!gameOver) moveDown();
        }, 1000);
        return () => clearInterval(interval);
    }, [position, gameOver]);

    // Focus on the container when the page loads
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.focus({ preventScroll: true });
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-screen overflow-hidden flex justify-center mt-[-60px] items-center p-4 select-none focus:outline-none"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            {/* Game Over message with Restart button */}
            {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black bg-opacity-75">
                    <h2 className="text-4xl font-bold text-white mb-4">Game Over!</h2>
                    <button
                        onClick={restartGame}
                        className="bg-white text-black px-4 py-2 rounded-lg shadow-lg hover:bg-gray-300 transition duration-200"
                    >
                        Restart Game
                    </button>
                </div>
            )}

            <div className="flex flex-row items-start justify-center space-x-8">
                <div className="score-and-title flex flex-col items-center text-center">
                    <h1 className="text-4xl font-bold mt-60 mb-4">Black and White Tetris</h1>
                    <div id="tetrisScore" className="score-box bg-black text-white p-4 rounded-lg shadow-lg mb-1">
                        <h2 className="text-xl font-bold">Score</h2>
                        <p className="text-2xl">{score}</p>
                    </div>
                </div>
                <div className="w-full flex items-center justify-center">
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
        </div>
    );
};

export default TetrisPage;
