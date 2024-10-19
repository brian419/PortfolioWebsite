"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// grid creation helper function for either 15x15 or 19x19 board
const createGrid = (cols: number, rows: number): (string | null)[][] =>
    Array.from({ length: rows }, () => Array(cols).fill(null));


// defining the type for the props of the Stone component
interface StoneProps {
    color: "black" | "white";
}

// stone component
const Stone = ({ color }: StoneProps) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: "STONE",
        item: { color },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    // creating a ref for the div element and pass it to both `drag` and the div element itself
    const ref = useRef<HTMLDivElement>(null);
    drag(ref); // applies the drag ref to the div

    return (
        <div
            ref={ref} // passes the ref to the div element
            className={`w-8 h-8 ${color === "black" ? "bg-black" : "bg-white"} rounded-full`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        />
    );
};


// boardcell component, where stones are dropped
interface BoardCellProps {
    row: number;
    col: number;
    cellValue: string | null;
    onDrop: (row: number, col: number, color: "black" | "white") => void;
    canDrop: boolean;
}

const BoardCell = ({ row, col, cellValue, onDrop, canDrop }: BoardCellProps) => {
    const ref = useRef<HTMLDivElement>(null); // creates ref for the cell

    const [{ isOver }, drop] = useDrop({
        accept: "STONE",
        drop: (item: { color: "black" | "white" }) => onDrop(row, col, item.color),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
        canDrop: () => !cellValue && canDrop, // prevent dropping on occupied cells and if it's not the player's turn
    });

    drop(ref); // applies the drop ref to the div

    return (
        <div
            ref={ref} // passes the ref to the div element
            className={`w-10 h-10 border border-black ${isOver && !cellValue ? "bg-green-200" : "bg-[#C9A35F]"}`}
        >
            {cellValue && (
                <div
                    className={`w-8 h-8 ${cellValue === "black" ? "bg-black" : "bg-white"} rounded-full mx-auto mt-1`}
                />
            )}
        </div>
    );
};


// gomokupage component (main game component)
export default function GomokuPage() {
    const [gridSize, setGridSize] = useState({ cols: 15, rows: 15 }); // state for grid size (default 15x15)
    const [gameStarted, setGameStarted] = useState(false); // state to track if the game has started
    const [grid, setGrid] = useState(createGrid(gridSize.cols, gridSize.rows)); // grid to store stone positions
    const [winner, setWinner] = useState<"black" | "white" | null>(null); // allow black, white, or null as valid values
    const [gameMode, setGameMode] = useState("computer"); // track game mode: computer or AI mode
    const [currentTurn, setCurrentTurn] = useState("black"); // track whose turn it is (black: Player 1, white: Player 2)
    const [finalMove, setFinalMove] = useState(false); // track if it's the final move to trigger a delay
    const [alertMessage, setAlertMessage] = useState(null); // for handling alerts when multiplayer is selected

    // function to check for five in a row
    const checkForWin = (row: number, col: number, color: "black" | "white"): boolean => {
        const directions = [
            { r: 0, c: 1 }, // horizontal
            { r: 1, c: 0 }, // vertical
            { r: 1, c: 1 }, // diagonal right-down
            { r: 1, c: -1 }, // diagonal left-down
        ];

        for (const { r, c } of directions) {
            let count = 1; // start by counting the current stone
            // check in both positive and negative directions for matching stones

            for (let i = 1; i < 5; i++) {
                const newRow = row + r * i;
                const newCol = col + c * i;
                if (newRow >= 0 && newRow < gridSize.rows && newCol >= 0 && newCol < gridSize.cols && grid[newRow][newCol] === color) {
                    count++;
                } else break;
            }

            for (let i = 1; i < 5; i++) {
                const newRow = row - r * i;
                const newCol = col - c * i;
                if (newRow >= 0 && newRow < gridSize.rows && newCol >= 0 && newCol < gridSize.cols && grid[newRow][newCol] === color) {
                    count++;
                } else break;
            }

            if (count >= 5) return true; // if there are five or more stones in a row, return true
        }
        return false;
    };

    // function to evaluate threats or opportunities from both players
    const evaluateBoard = (
        grid: (string | null)[][],
        gridSize: { cols: number; rows: number },
        color: "black" | "white"
    ): { row: number; col: number } | null => {
        const directions = [
            { r: 0, c: 1 }, // horizontal
            { r: 1, c: 0 }, // vertical
            { r: 1, c: 1 }, // diagonal right-down
            { r: 1, c: -1 }, // diagonal left-down
        ];

        const getScore = (row: number, col: number, direction: { r: number; c: number }) => {
            let count = 0;
            const emptySpots: { row: number; col: number }[] = [];
            let blocks = 0; // track if either side is blocked
            let gapFound = false; // track if there's a gap in between stones

            // check in the positive direction
            for (let i = 1; i < 5; i++) {
                const newRow = row + direction.r * i;
                const newCol = col + direction.c * i;
                if (newRow >= 0 && newRow < gridSize.rows && newCol >= 0 && newCol < gridSize.cols) {
                    if (grid[newRow][newCol] === color) {
                        count++;
                    } else if (!grid[newRow][newCol]) {
                        if (!gapFound) {
                            emptySpots.push({ row: newRow, col: newCol });
                            gapFound = true;
                        } else {
                            break; // stop once we find a second gap or empty spot
                        }
                    } else {
                        blocks++;
                        break; // stop if we hit the opponent's piece
                    }
                }
            }

            // check in the negative direction
            gapFound = false;
            for (let i = 1; i < 5; i++) {
                const newRow = row - direction.r * i;
                const newCol = col - direction.c * i;
                if (newRow >= 0 && newRow < gridSize.rows && newCol >= 0 && newCol < gridSize.cols) {
                    if (grid[newRow][newCol] === color) {
                        count++;
                    } else if (!grid[newRow][newCol]) {
                        if (!gapFound) {
                            emptySpots.push({ row: newRow, col: newCol });
                            gapFound = true;
                        } else {
                            break; // stop once we find a second gap or empty spot
                        }
                    } else {
                        blocks++;
                        break; // stop if we hit the opponent's piece
                    }
                }
            }

            return { count, emptySpots, blocks };
        };

        let bestMove = null;
        let maxCount = 0; // tracks the highest number of consecutive stones the AI can extend

        for (let row = 0; row < gridSize.rows; row++) {
            for (let col = 0; col < gridSize.cols; col++) {
                if (grid[row][col] === color) {
                    for (const dir of directions) {
                        const { count, emptySpots, blocks } = getScore(row, col, dir);

                        // if we find a better offensive move
                        if (count > maxCount && emptySpots.length > 0 && blocks < 2) {
                            maxCount = count; // update the maxCount
                            bestMove = emptySpots[0]; // save the best move
                        }

                        // if the player has 2 or more in a row with a gap that could form 3+ in the future
                        if (count >= 2 && emptySpots.length > 0 && blocks < 2) {
                            return emptySpots[0]; // block Player 1 at this location
                        }

                        // detect a gap within a sequence (dot, empty, dot)
                        if (count === 2 && emptySpots.length > 1 && blocks === 0) {
                            return emptySpots[0]; // fill the gap to prevent Player 1 from forming a sequence
                        }
                    }
                }
            }
        }

        return bestMove; // return the best offensive move found
    };
    

    // function to handle dropping stones on the board
    const handleDrop = (row: number, col: number, color: "black" | "white") => {
        if (!grid[row][col] && !winner) {
            const newGrid = [...grid];
            newGrid[row][col] = color;
            setGrid(newGrid);

            // check for win condition
            if (checkForWin(row, col, color)) {
                // if it's a final winning move, setFinalMove to delay the game over screen
                setFinalMove(true);
                setTimeout(() => setWinner(color), 1250); // about 1-second delay before showing game over
                return;
            }

            // switch turns
            setCurrentTurn(color === "black" ? "white" : "black");
        }
    };

    // computer move logic (strategic AI) 
    // needs to be worked on extensively. it sometimes fails to block the player's winning move and tries to win when it's not close as compared to player 1
    const makeComputerMove = () => {
        if (winner || currentTurn !== "white") return; // only move if it's the computer's turn and no winner

        // Check for threats or opportunities from both players
        const move = evaluateBoard(grid, gridSize, "white") || evaluateBoard(grid, gridSize, "black");
        if (move) {
            handleDrop(move.row, move.col, "white");
            return;
        }

        // otherwise, make a random move (as fallback)
        const availableMoves = [];
        for (let row = 0; row < gridSize.rows; row++) {
            for (let col = 0; col < gridSize.cols; col++) {
                if (!grid[row][col]) {
                    availableMoves.push({ row, col });
                }
            }
        }

        if (availableMoves.length > 0) {
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            handleDrop(randomMove.row, randomMove.col, "white");
        }
    };

    // trigger computer move after player 1 (black) plays
    useEffect(() => {
        if (currentTurn === "white" && gameMode === "computer" && !winner && !finalMove) {
            const timeoutId = setTimeout(() => makeComputerMove(), 1000); // delay for computer move
            return () => clearTimeout(timeoutId); // clear timeout if necessary
        }
    }, [currentTurn, gameMode, winner, finalMove]);

    // function to handle multiplayer or AI mode click
    const handleModeNotImplementedClick = () => {
        setAlertMessage("This game mode is not implemented yet.");
        setTimeout(() => setAlertMessage(null), 2000); // clear the message after 2 seconds
    };

    // function to restart game and return to the start screen
    const restartGame = () => {
        setGameStarted(false); // reset to the start screen
        setWinner(null); // reset winner
        setFinalMove(false); // reset final move state
        setGrid(createGrid(gridSize.cols, gridSize.rows)); // reset grid
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex items-center justify-center min-h-screen">
                {/* if game hasn't started or there's a winner, show start/game-over screen */}
                {!gameStarted || winner ? (
                    <div className="flex flex-col items-center space-y-8">
                        <h1 className="text-4xl font-bold mb-8 text-center">
                            {winner ? (
                                <>
                                    <span className="animate-rainbow">Game Over!</span> <br /> <br />
                                    <span className="block animate-bounce text-[#3658B7]">{winner === "black" ? "Player 1" : "Computer"} wins!</span>
                                </>
                            ) : "Welcome to Gomoku!"}
                        </h1>

                        {/* game mode selection (computer vs multiplayer) */}
                        {!gameStarted && !winner && (
                            <div className="flex space-x-4">
                                <button
                                    className={`px-4 py-2 border rounded-lg ${gameMode === "computer" ? "bg-blue-500 text-white" : ""}`}
                                    onClick={() => setGameMode("computer")}
                                >
                                    Play Against Computer
                                </button>
                                <button
                                    className="px-4 py-2 border rounded-lg bg-gray-300 text-gray-600"
                                    onClick={handleModeNotImplementedClick}
                                >
                                    AI Mode
                                </button>
                                <button
                                    className="px-4 py-2 border rounded-lg bg-gray-300 text-gray-600"
                                    onClick={handleModeNotImplementedClick}
                                >
                                    Multiplayer Mode
                                </button>
                            </div>
                        )}

                        {/* display alert message */}
                        {alertMessage && <p className="text-red-500">{alertMessage}</p>}

                        {/* grid size selection */}
                        {!winner && (
                            <div className="flex space-x-4">
                                <button
                                    className={`px-4 py-2 border rounded-lg ${gridSize.cols === 15 ? "bg-blue-500 text-white" : ""}`}
                                    onClick={() => setGridSize({ cols: 15, rows: 15 })}
                                >
                                    15x15 Mode
                                </button>
                                <button
                                    className={`px-4 py-2 border rounded-lg ${gridSize.cols === 19 ? "bg-blue-500 text-white" : ""}`}
                                    onClick={() => setGridSize({ cols: 19, rows: 19 })}
                                >
                                    19x19 Mode
                                </button>
                            </div>
                        )}

                        {/* start game button */}
                        <button
                            className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg"
                            onClick={gameStarted ? restartGame : () => setGameStarted(true)}
                            disabled={!gameMode} // disable button until a game mode is selected
                        >
                            {winner ? "Restart Game" : "Start Game"}
                        </button>
                    </div>
                ) : (
                    /* flex container for smaller boards and main board */
                    <div className="flex items-center space-x-10">
                        {/* smaller board for black pieces (player 1) */}
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold mb-2 text-black">Player 1</h2>
                            <div className="flex flex-col justify-center border border-black p-2 bg-gray-900 relative">
                                <div className="absolute inset-0 bg-gray-400 opacity-50"></div>
                                <div className="relative z-10 flex flex-col space-y-2">
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <Stone key={i} color="black" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* main board (15x15 or 19x19 based on mode) */}
                        <div className="flex flex-col items-center">
                            <h2 className="text-2xl font-bold mb-4">
                                {currentTurn === "black" ? "Player 1's turn" : "Computer's turn"}
                            </h2>
                            {grid.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex">
                                    {row.map((cell, cellIndex) => (
                                        <BoardCell
                                            key={cellIndex}
                                            row={rowIndex}
                                            col={cellIndex}
                                            cellValue={cell}
                                            onDrop={handleDrop}
                                            canDrop={currentTurn === "black"} // only allow drop if it's Player 1's turn
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* smaller board for white pieces (player 2) */}
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold mb-2 text-white text-center">Player 2: <br></br> Computer</h2>
                            <div className="flex flex-col justify-center border border-black p-2 bg-gray-900 relative">
                                <div className="absolute inset-0 bg-gray-400 opacity-50"></div>
                                <div className="relative z-10 flex flex-col space-y-2">
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <Stone key={i} color="white" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DndProvider>
    );
}
