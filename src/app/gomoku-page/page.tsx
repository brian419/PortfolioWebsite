"use client";
import React, { useState } from 'react';

const COLS = 15;
const ROWS = 15;
const COLS_PIECES = 2;
const ROWS_PIECES = 8;
const createGrid = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));
const createGridForPieces = () => Array.from({ length: ROWS_PIECES }, () => Array(COLS_PIECES).fill(0));

export default function GomokuPage() {
    const [grid, setGrid] = useState(createGrid());
    const [gridPieces, setGridPieces] = useState(createGridForPieces());

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>
                {grid.map((row, rowIndex) => ( // displays the 15x15 board
                    <div key={rowIndex} className="flex"> 
                        {row.map((cell, cellIndex) => (
                            <div
                                key={cellIndex}
                                className="w-10 h-10 border border-black bg-[#C9A35F]" 
                            >
                            </div>
                        ))}
                    </div>
                ))}
                {gridPieces.map((row, rowIndex) => ( 
                    <div key={rowIndex} className="flex"> 
                        {row.map((cell, cellIndex) => (
                            <div
                                key={cellIndex} // this grid pieces is for the left side, so choose which stone color starts here
                                className="w-5 h-5 border border-black bg-white"  // make sure this moves to the left bruh
                            >
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}


// 15x15 board (current) but used to be 19x19 board (can be offered as a feature)
// Players take turn placing a stone of their color on an empty intersection
// Black stone always plays first
// The winner is the first player to form an unbroken chain of five stones horizontally, vertically, or diagonally
// In some rules, this line must be exactly five stones long; six or more stones in a row does not count as a win and is called an overline.
// if the board is completely filled and no one has made a line of 5 stones, then the game ends in a draw.

// TODO: Create a 15x15 board
// Create Player 1 which is the user that always starts with Black stone
// Create a computer based Player 2 for the white stone. 
// Implement the rules of the game
// Implement the win conditions
// Implement the draw conditions
// Implement the turn taking
// Implement the game end conditions
// Implement the game restart conditions
// Implement the game history
// Implement the game restart button
// Implement the game global leaderboard (?)



// Currently: 
// Implemented a 15x15 board
// Want to implemenet two smaller boards on the left and right of the board for holding the black and white stones. 
