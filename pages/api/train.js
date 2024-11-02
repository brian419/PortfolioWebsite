import fs from 'fs';
import path from 'path';

// simulate training with progress
let trainingProgress = 0;
let gamesPlayed = 0;
let totalScore = 0;
let bestModel = null;

class GomokuAI {
    constructor(color, qTable = {}, learningRate = 0.1, discountFactor = 0.95, explorationRate = 0.1) {
        this.color = color;
        this.qTable = qTable;
        this.learningRate = learningRate;
        this.discountFactor = discountFactor;
        this.explorationRate = explorationRate;
    }

    getStateKey(board) {
        return JSON.stringify(board);
    }

    makeMove(board) {
        const availableMoves = [];
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[0].length; c++) {
                if (board[r] && board[r][c] === null) {  // check if board[r] exists and is not null
                    availableMoves.push([r, c]);
                }
            }
        }
        // exploration and exploitation logic remains the same
        if (Math.random() < this.explorationRate) {
            return availableMoves[Math.floor(Math.random() * availableMoves.length)];
        } else {
            const stateKey = this.getStateKey(board);
            if (this.qTable[stateKey]) {
                const moveValues = this.qTable[stateKey];
                const bestMove = Object.keys(moveValues).reduce((a, b) => (moveValues[a] > moveValues[b] ? a : b));
                return bestMove.split(',').map(Number);
            }
            return availableMoves[Math.floor(Math.random() * availableMoves.length)];
        }
    }


    updateQValue(oldBoard, newBoard, move, reward) {
        const oldStateKey = this.getStateKey(oldBoard);
        const newStateKey = this.getStateKey(newBoard);

        if (!this.qTable[oldStateKey]) {
            this.qTable[oldStateKey] = {};
        }
        const maxFutureReward = Math.max(...Object.values(this.qTable[newStateKey] || {}), 0);

        const currentQValue = this.qTable[oldStateKey][move] || 0;
        const newQValue =
            currentQValue + this.learningRate * (reward + this.discountFactor * maxFutureReward - currentQValue);
        this.qTable[oldStateKey][move] = newQValue;
    }

    getReward(board, color) {
        if (checkWinner(board, color)) return 1;
        if (checkWinner(board, color === 'black' ? 'white' : 'black')) return -1;
        return 0.1;
    }
}

function initializeBoard(size = 15) {
    return Array.from({ length: size }, () => Array(size).fill(null));
}

function checkWinner(board, color) {
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
    ];
    const gridSize = board.length;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === color) {
                for (const [rDir, cDir] of directions) {
                    let count = 1;
                    for (let i = 1; i < 5; i++) {
                        const newRow = row + rDir * i;
                        const newCol = col + cDir * i;
                        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && board[newRow][newCol] === color) {
                            count++;
                        } else break;
                    }
                    for (let i = 1; i < 5; i++) {
                        const newRow = row - rDir * i;
                        const newCol = col - cDir * i;
                        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && board[newRow][newCol] === color) {
                            count++;
                        } else break;
                    }
                    if (count >= 5) return true;
                }
            }
        }
    }
    return false;
}

function saveModel(qTable, modelName) {
    const modelPath = path.join(process.cwd(), 'models', `${modelName}.json`);
    fs.mkdirSync(path.dirname(modelPath), { recursive: true });
    fs.writeFileSync(modelPath, JSON.stringify(qTable));
}

function loadModel(modelName) {
    const modelPath = path.join(process.cwd(), 'models', `${modelName}.json`);
    if (fs.existsSync(modelPath)) {
        return JSON.parse(fs.readFileSync(modelPath));
    }
    return null;
}

function saveTrainingOutput(board, winner, gamesPlayed, totalScore) {
    const outputDir = path.join(process.cwd(), 'training_output');
    fs.mkdirSync(outputDir, { recursive: true });
    const dateStr = new Date().toISOString().replace(/:/g, '-');
    const fileName = `boardIteration_${gamesPlayed}_totalScore_${totalScore}_time_${dateStr}.txt`;
    const filePath = path.join(outputDir, fileName);

    const data = `Winner: ${winner}\nTotal Score: ${totalScore}\n` + board.map(row => row.map(cell => cell || '.').join(' ')).join('\n');
    fs.writeFileSync(filePath, data);
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log("Connected to train_ai.js for /train");
        trainingProgress = 0;
        gamesPlayed = 0;
        totalScore = 0;
        const maxTotalGames = 2;

        let blackAI = new GomokuAI('black', loadModel("black_ai_model"));
        let whiteAI = new GomokuAI('white', loadModel("white_ai_model"));

        while (gamesPlayed < maxTotalGames) {
            const board = initializeBoard();
            let currentTurn = 'black';
            let winner = null;
            const gameMoves = [];

            for (let turn = 0; turn < 225; turn++) {
                const currentAI = currentTurn === 'black' ? blackAI : whiteAI;
                const move = currentAI.makeMove(board);
                board[move[0]][move[1]] = currentTurn;
                gameMoves.push([currentTurn, JSON.parse(JSON.stringify(board)), move]);
                if (checkWinner(board, currentTurn)) {
                    winner = currentTurn;
                    break;
                }
                currentTurn = currentTurn === 'black' ? 'white' : 'black';
            }

            const reward = winner === 'black' ? 1 : winner === 'white' ? -1 : 0;
            totalScore += reward;
            for (const [color, oldBoard, move] of gameMoves.reverse()) {
                if (color === 'black') blackAI.updateQValue(oldBoard, board, move, reward);
                else whiteAI.updateQValue(oldBoard, board, move, -reward);
            }

            gamesPlayed += 1;
            trainingProgress = (gamesPlayed / maxTotalGames) * 100;
        }

        saveModel(blackAI.qTable, "black_ai_model");
        saveModel(whiteAI.qTable, "white_ai_model");
        saveTrainingOutput(initializeBoard(), null, gamesPlayed, totalScore);

        res.status(200).json({ progress: trainingProgress, gamesPlayed, bestModel });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
