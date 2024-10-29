
// v2 for different sections / also added debug section for ai training
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
    isPlayer: boolean; // new prop to determine if it's a player-controlled stone
}

// stone component
const Stone = ({ color, isPlayer }: StoneProps) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: "STONE",
            item: { color },
            canDrag: isPlayer, // disables dragging if not player-controlled
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [isPlayer] // recomputes when `isPlayer` changes
    );

    // creating a ref for the div element and pass it to both `drag` and the div element itself
    const ref = useRef<HTMLDivElement>(null);
    if (isPlayer) {
        drag(ref); // apply drag only if it's player stones
    }

    return (
        <div
            ref={ref} // passes the ref to the div element
            className={`w-8 h-8 ${color === "black" ? "bg-black" : "bg-white"} rounded-full ${!isPlayer ? "cursor-not-allowed" : ""
                }`} // applies not-allowed cursor for non-player stones
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
        canDrop: () => !cellValue && canDrop, // prevent dropping on occupied cells
    });

    drop(ref); // applies the drop ref to the div

    return (
        <div
            ref={ref} // passes the ref to the div element
            className={`w-10 h-10 border border-black ${isOver && !cellValue ? "bg-green-200" : "bg-[#C9A35F]"
                }`}
        >
            {cellValue && (
                <div
                    className={`w-8 h-8 ${cellValue === "black" ? "bg-black" : "bg-white"} rounded-full mx-auto mt-1`}
                />
            )}
        </div>
    );
};

// (main game component)
export default function GomokuPage() {
    const [gridSize, setGridSize] = useState({ cols: 15, rows: 15 }); // state for grid size (default 15x15)
    const [gameStarted, setGameStarted] = useState(false); // state to track if the game has started
    const [grid, setGrid] = useState(createGrid(gridSize.cols, gridSize.rows)); // grid to store stone positions
    const [winner, setWinner] = useState<"black" | "white" | null>(null); // allow black, white, or null as valid values
    const [gameMode, setGameMode] = useState("computer"); // track game mode: computer, ai, or multiplayer
    const [currentTurn, setCurrentTurn] = useState("black"); // track whose turn it is (black: Player 1, white: Player 2)
    const [firstPlayerMove, setFirstPlayerMove] = useState<{ row: number; col: number } | null>(null); // track Player 1's first move
    const [computerFirstMove, setComputerFirstMove] = useState(false); // track if the computer has already made its first move
    const [finalMove, setFinalMove] = useState(false); // track if it's the final move to trigger a delay
    const [alertMessage, setAlertMessage] = useState<string | null>(null); // for handling alerts when multiplayer is selected

    // updates grid size and reinitialize the board when the user selects a different grid size
    const handleGridSizeChange = (cols: number, rows: number) => {
        setGridSize({ cols, rows });
        setGrid(createGrid(cols, rows)); // reinitializes the grid with new dimensions
    };

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

    // function to handle multiplayer or AI mode click
    const handleModeNotImplementedClick = () => {
        setAlertMessage("This game mode is not implemented yet.");
        setTimeout(() => setAlertMessage(null), 2000); // clear the message after 2 seconds
    };

    // ---------------------------------------
    // SECTION 1: Player vs Computer Mode
    // ---------------------------------------

    // function to evaluate threats or opportunities from both players for Player vs Computer
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

        const opponentColor = color === "black" ? "white" : "black";

        // gets the score function for a direction and a position
        const getScore = (row: number, col: number, direction: { r: number; c: number }, targetColor: string) => {
            let count = 0;
            const openSpots: { row: number; col: number }[] = [];
            let blocks = 0;

            // checks in the positive direction
            for (let i = 1; i < 5; i++) {
                const newRow = row + direction.r * i;
                const newCol = col + direction.c * i;
                if (newRow >= 0 && newRow < gridSize.rows && newCol >= 0 && newCol < gridSize.cols) {
                    if (grid[newRow][newCol] === targetColor) {
                        count++;
                    } else if (!grid[newRow][newCol]) {
                        openSpots.push({ row: newRow, col: newCol });
                        break; // stops after finding an open spot
                    } else {
                        blocks++;
                        break; // blocked by the opponent's stone
                    }
                }
            }

            // checks in the negative direction
            for (let i = 1; i < 5; i++) {
                const newRow = row - direction.r * i;
                const newCol = col - direction.c * i;
                if (newRow >= 0 && newRow < gridSize.rows && newCol >= 0 && newCol < gridSize.cols) {
                    if (grid[newRow][newCol] === targetColor) {
                        count++;
                    } else if (!grid[newRow][newCol]) {
                        openSpots.push({ row: newRow, col: newCol });
                        break; // stops after finding an open spot
                    } else {
                        blocks++;
                        break; // blocked by the opponent's stone
                    }
                }
            }

            // returns count of aligned stones, possible open spots, and block status
            return { count, openSpots, blocks };
        };

        let bestMove = null;
        let maxScore = 0; // tracks the highest scoring move (offensive or defensive)

        for (let row = 0; row < gridSize.rows; row++) {
            for (let col = 0; col < gridSize.cols; col++) {
                if (!grid[row][col]) {
                    // checks defensive moves (block Player 1)
                    for (const dir of directions) {
                        const { count: playerCount, openSpots: playerOpenSpots, blocks: playerBlocks } = getScore(row, col, dir, opponentColor);

                        // if Player 1 has 4 in a row and there is an open spot to block, do it
                        if (playerCount === 4 && playerOpenSpots.length > 0 && playerBlocks < 2) {
                            console.log(`AI detects Player's winning threat at: ${playerOpenSpots[0].row}, ${playerOpenSpots[0].col}`);
                            return playerOpenSpots[0]; // blocks Player 1 from winning
                        }
                    }

                    // checks offensive moves after ensuring no block is needed
                    for (const dir of directions) {
                        const { count, openSpots, blocks } = getScore(row, col, dir, color); // get the score for the current direction

                        // calculates the move score based on the number of stones and gaps found
                        let moveScore = count;

                        // adjusts the score based on the number of blocks (lower if blocked on both sides)
                        if (blocks === 1) moveScore -= 1;
                        if (blocks === 2) { // if blocked on both sides, skip this move
                            console.log(`Move blocked on both sides at (${row}, ${col}), skipping.`);
                            continue;
                        }

                        // prioritize moves that form 4 or more in a row (immediate win)
                        if (count >= 4 && openSpots.length > 0) {
                            console.log(`AI finds winning/defensive move at: ${openSpots[0].row}, ${openSpots[0].col}`);
                            return openSpots[0]; // makes this move immediately (offensive or defensive)
                        }

                        // if we find a better scoring move, select it
                        if (moveScore > maxScore && openSpots.length > 0) {
                            maxScore = moveScore;
                            console.log(`Checking move at (${row}, ${col}) with moveScore: ${moveScore}, openSpots: ${openSpots.length}`);
                            bestMove = openSpots[0];
                            console.log(`Best move updated to: ${bestMove.row}, ${bestMove.col}`);
                        }
                    }
                }
            }
        }

        if (bestMove) {
            console.log(`AI selects best offensive move at: ${bestMove.row}, ${bestMove.col}`);
        } else {
            console.log("AI found no valid move");
        }

        return bestMove; // return the best move found
    };

    // function to handle dropping stones on the board for Player vs Computer
    const handleDrop = (row: number, col: number, color: "black" | "white") => {
        if (!grid[row][col] && !winner) {
            const newGrid = [...grid];
            newGrid[row][col] = color;
            setGrid(newGrid);

            console.log(`${color === "black" ? "Player 1" : "Computer"} placed stone at (${row}, ${col})`);

            if (color === "black" && !firstPlayerMove) {
                setFirstPlayerMove({ row, col });
            }

            if (checkForWin(row, col, color)) {
                setFinalMove(true);
                setTimeout(() => setWinner(color), 1250);
                return;
            }

            setCurrentTurn(color === "black" ? "white" : "black");
        }
    };

    // computer move logic (strategic AI)
    const makeComputerMove = () => {
        if (winner || currentTurn !== "white") {
            return;
        }

        console.log("Computer's turn to move");

        if (!computerFirstMove && firstPlayerMove) {
            const { row, col } = firstPlayerMove;

            const adjacentMoves = [
                { row: row - 1, col },
                { row: row + 1, col },
                { row, col: col - 1 },
                { row, col: col + 1 },
            ];

            for (const move of adjacentMoves) {
                if (
                    move.row >= 0 && move.row < gridSize.rows &&
                    move.col >= 0 && move.col < gridSize.cols &&
                    !grid[move.row][move.col]
                ) {
                    console.log(`Computer places first stone at (${move.row}, ${move.col})`);
                    handleDrop(move.row, move.col, "white");
                    setComputerFirstMove(true);
                    setCurrentTurn("black");
                    return;
                }
            }
        }

        const bestMove = evaluateBoard(grid, gridSize, "white");
        if (bestMove) {
            handleDrop(bestMove.row, bestMove.col, "white");
        }
    };

    // trigger computer move after Player 1 plays
    useEffect(() => {
        if (currentTurn === "white" && gameMode === "computer" && !winner && !finalMove) {
            const timeoutId = setTimeout(() => makeComputerMove(), 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [currentTurn, gameMode, winner, finalMove]);

    // ---------------------------------------
    // SECTION 2: Player vs AI (Deep Learning)
    // ---------------------------------------
    useEffect(() => {
        if (gameMode === "ai" && gameStarted && !winner && currentTurn === "white") {
            handleAIPlay();
        }
    }, [gameMode, gameStarted, winner, currentTurn]);


    // function to handle deep learning AI logic for Player vs AI mode
    const handleAIPlay = () => {
        //reset previous game state
        setWinner(null);
        setFinalMove(false);
        setComputerFirstMove(false);
        setFirstPlayerMove(null);
        setGrid(createGrid(gridSize.cols, gridSize.rows));


        console.log("Starting player vs AI mode.");

        setCurrentTurn("black");
        setFirstPlayerMove(null);
    
        const handleDrop2 = (row: number, col: number, color: "black" | "white") => {
            console.log("Handling drop...");
    
            if (!grid[row][col] && !winner) {
                const newGrid = [...grid];
                newGrid[row][col] = color;
                setGrid(newGrid);
    
                console.log(`${color === "black" ? "Player 1" : "Computer"} placed stone at (${row}, ${col})`);
    
                if (color === "black" && !firstPlayerMove) {
                    setFirstPlayerMove({ row, col });
                    console.log("Player 1's first move detected at:", row, col);
                }
    
                if (checkForWin(row, col, color)) {
                    setFinalMove(true);
                    setTimeout(() => setWinner(color), 1250);
                    return;
                }

                setCurrentTurn(color === "black" ? "white" : "black");
                if (color === "black") {
                    console.log ("setCurrentTurn set color to black turn")
                } else {
                    console.log ("setCurrentTurn set color to white turn")
                }
            }
        };
    
        const makeAIMove = async () => {
            console.log("Checking if it's AI's turn to move...");

            if (currentTurn === "black") {
                console.log("Waiting for Player 1 to make a move")
            }
    
            if (currentTurn === "white") {
                console.log("AI's turn to move");
    
                const response = await fetch("http://localhost:5001/ai-move-2", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        board: grid, // send current grid state as board
                        gridSize,
                        color: "white" // consistent use of "white" for AI
                    }),
                    mode: 'cors'
                });
    
                console.log("Payload being sent:", {
                    board: grid,
                    gridSize,
                    color: "white"
                });
    
                if (response.ok) {
                    const { row, col } = await response.json();
                    handleDrop2(row, col, "white"); // AI places "white" stone
                } else {
                    console.error("Failed to fetch AI move.");
                }
            }
        };
    
        // Call makeAIMove only if it's AI's turn (currentTurn should be "white" for AI)
        // if (currentTurn === "white") {
        //     makeAIMove();
        // }
        makeAIMove();
    };
    


    // ---------------------------------------
    // SECTION 3: Player vs Player (Multiplayer)
    // ---------------------------------------

    // function to handle multiplayer mode (currently not implemented)
    const handleMultiplayerPlay = () => {
        setAlertMessage("Multiplayer mode is currently locked.");
        console.log("Multiplayer mode is not yet implemented.");
        setTimeout(() => setAlertMessage(null), 2000);
    };

    // function to restart game and return to the start screen
    const restartGame = () => {
        setGameStarted(true);
        setWinner(null);
        setFinalMove(false);
        setComputerFirstMove(false);
        setFirstPlayerMove(null);
        setCurrentTurn("black");
        setGrid(createGrid(gridSize.cols, gridSize.rows));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex items-center justify-center min-h-screen">
                {!gameStarted || winner ? (
                    <div className="flex flex-col items-center space-y-8">
                        <h1 className="text-4xl font-bold mb-8 text-center">
                            {winner ? (
                                <>
                                    <span className="animate-rainbow">Game Over!</span> <br /> <br />
                                    <span className="block animate-bounce text-[#3658B7]">
                                        {winner === "black" ? "Player 1" : "Computer"} wins!
                                    </span>
                                </>
                            ) : (
                                "Welcome to Gomoku!"
                            )}
                        </h1>

                        {!gameStarted && !winner && (
                            <div className="flex space-x-4">
                                <button
                                    className={`px-4 py-2 border rounded-lg ${gameMode === "computer" ? "bg-blue-500 text-white" : ""}`}
                                    onClick={() => setGameMode("computer")}
                                >
                                    Play Against Computer
                                </button>
                                <button
                                    className={`px-4 py-2 border rounded-lg ${gameMode === "ai" ? "bg-blue-500 text-white" : ""}`}
                                    onClick={() => setGameMode("ai")}
                                >
                                    AI Mode
                                </button>
                                <a href="/gomoku-page/ai-gomoku-page" className={`px-4 py-2 border rounded-lg`}>
                                    AI Mode Debug
                                </a>
                                <button
                                    className="px-4 py-2 border rounded-lg bg-gray-300 text-gray-600"
                                    onClick={handleMultiplayerPlay}
                                >
                                    Multiplayer Mode
                                </button>
                            </div>
                        )}

                        {alertMessage && <p className="text-red-500">{alertMessage}</p>}

                        {!winner && (
                            <div className="flex space-x-4">
                                <button
                                    className={`px-4 py-2 border rounded-lg ${gridSize.cols === 15 ? "bg-blue-500 text-white" : ""
                                        }`}
                                    onClick={() => handleGridSizeChange(15, 15)}
                                >
                                    15x15 Mode
                                </button>
                                <button
                                    className={`px-4 py-2 border rounded-lg ${gridSize.cols === 19 ? "bg-blue-500 text-white" : ""
                                        }`}
                                    onClick={() => handleGridSizeChange(19, 19)}
                                >
                                    19x19 Mode
                                </button>
                            </div>
                        )}

                        <button
                            className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg"
                            onClick={gameStarted ? restartGame : () => setGameStarted(true)}
                            disabled={!gameMode}
                        >
                            {winner ? "Restart Game" : "Start Game"}
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-10">
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold mb-2 text-[#49A097]">Player 1</h2>
                            <div className="flex flex-col justify-center border border-black p-2 bg-gray-900 relative">
                                <div className="absolute inset-0 bg-gray-400 opacity-50"></div>
                                <div className="relative z-10 flex flex-col space-y-2">
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <Stone key={i} color="black" isPlayer={true} />
                                    ))}
                                </div>
                            </div>
                        </div>

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
                                            canDrop={currentTurn === "black"}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold mb-2 text-[#49A097] text-center">
                                Player 2: <br /> Computer
                            </h2>
                            <div className="flex flex-col justify-center border border-black p-2 bg-gray-900 relative">
                                <div className="absolute inset-0 bg-gray-400 opacity-50"></div>
                                <div className="relative z-10 flex flex-col space-y-2">
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <Stone key={i} color="white" isPlayer={false} />
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



