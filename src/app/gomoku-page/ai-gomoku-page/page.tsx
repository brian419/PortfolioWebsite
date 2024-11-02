
// v3
"use client";
import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// grid creation helper function for a 15x15 board
const createGrid = (cols: number, rows: number): (string | null)[][] =>
    Array.from({ length: rows }, () => Array(cols).fill(null));

// boardcell component, where stones are placed
interface BoardCellProps {
    row: number;
    col: number;
    cellValue: string | null;
}

const BoardCell = ({ row, col, cellValue }: BoardCellProps) => {
    return (
        <div
            className={`w-10 h-10 border border-black ${cellValue ? "" : "bg-[#C9A35F]"} `}
        >
            {cellValue && (
                <div
                    className={`w-8 h-8 ${cellValue === "black" ? "bg-black" : "bg-white"} rounded-full mx-auto mt-1`}
                />
            )}
        </div>
    );
};

export default function AIGomokuPage() {
    const [grid, setGrid] = useState<(string | null)[][]>(createGrid(15, 15)); // grid to store stone positions
    const [trainingProgress, setTrainingProgress] = useState<number>(0); // AI training progress
    const [isTraining, setIsTraining] = useState(false); // track if training is ongoing
    const [aiMove, setAiMove] = useState<{ row: number; col: number } | null>(null); // AI move from backend
    // const [currentTurn, setCurrentTurn] = useState<string>("black"); // trakcs whose turn it is
    const [currentTurn, setCurrentTurn] = useState<"black" | "white">("black"); 
    const [gamesPlayed, setGamesPlayed] = useState<number>(0); // tracks number of games played

    // function to start AI training and fetch progress from backend
    // for localhost only
    // const startTraining = async () => {
    //     setIsTraining(true);
    //     try {   
    //         const response = await fetch('http://localhost:5001/train'); // call to Python backend
    //         const data = await response.json();
    //         setTrainingProgress(data.progress); // set progress from backend response
    //     } catch (error) {
    //         console.error('Error during training:', error);
    //     }
    // };

    // for development only //
    const startTraining = async () => {
        setIsTraining(true);
        try {   
            const response = await fetch(`${process.env.FRONTEND_ORIGIN}/train`); 
            const data = await response.json();
            setTrainingProgress(data.progress); 
        } catch (error) {
            console.error('Error during training:', error);
        }
    };
    

    // function to get AI move from backend after each turn
    const getAIMove = async () => {
        try {
            const response = await fetch('http://localhost:5001/ai-move');
            const data = await response.json();
            if (response.ok) {
                setAiMove(data); // set AI move from backend
                updateBoard(data.row, data.col, currentTurn); // update board with AI's move
                setCurrentTurn(currentTurn === "black" ? "white" : "black"); // switch turns
            } else {
                console.error('Error getting AI move:', data.error);
            }
        } catch (error) {
            console.error('Error fetching AI move:', error);
        }
    };

    // update board with AI's move
    const updateBoard = (row: number, col: number, color: "black" | "white") => {
        const newGrid = [...grid]; // create a new grid copy
        newGrid[row][col] = color; // mark AI's move with correct color
        setGrid(newGrid); // update the grid state
    };

    // reset the board when a new game starts
    const resetBoard = () => {
        setGrid(createGrid(15, 15));  
        setCurrentTurn("black");  
    };

    // trigger getAIMove once training reaches 100%
    useEffect(() => {
        if (trainingProgress === 100) {
            if (gamesPlayed < 2) {  
                getAIMove();
            }
        }
    }, [trainingProgress]);

    useEffect(() => {
        if (aiMove) {
            if (gamesPlayed < 2) {
                getAIMove();  
            }
        }
    }, [aiMove]);

    useEffect(() => {
        if (gamesPlayed < 2) {
            resetBoard();  
        }
    }, [gamesPlayed]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl text-gray-300 font-bold mb-6">Training AI Agent (white piece model is saved)</h1>

                {/* display ai training progress */}
                {/* <div className="w-full max-w-lg">
                    <div className="bg-gray-200 rounded-full h-6 mb-4">
                        <div className="bg-blue-500 h-6 rounded-full" style={{ width: `${trainingProgress}%` }}></div>
                    </div>
                    <p className="text-lg font-semibold">{trainingProgress}% Complete</p>
                </div> */}

                {/* start training button */}
                {!isTraining && trainingProgress < 100 && (
                    <button className="px-6 py-3 mt-6 bg-[#377F3F] hover:text-black text-white rounded-lg" onClick={startTraining}>
                        Start AI Training
                    </button>
                )}

                {/* gomoku board with theme colors */}
                <div className="mt-8 grid grid-cols-15 gap-1">
                    {grid.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex">
                            {row.map((cell, colIndex) => (
                                <BoardCell
                                    key={colIndex}
                                    row={rowIndex}
                                    col={colIndex}
                                    cellValue={cell}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {/* show AI move after training */}
                {/* {trainingProgress === 100 && aiMove && (
                    <p className="text-lg mt-4">
                        AI ({currentTurn === "black" ? "White" : "Black"}) made a move at row: {aiMove.row}, col: {aiMove.col}
                    </p>
                )} */}

                {/* placeholder text */}
                <p className="text-gray-600 mt-8 flex-wrap p-20">
                    This page will not show in future deployments. It is only here for demonstration purposes as well as helping to debug. The overall goal is for the deep learning to have a better reward system than now and to train an excellent agent that can play against the user in gamemode Player vs AI. 
                </p>
            </div>
        </DndProvider>
    );
}
