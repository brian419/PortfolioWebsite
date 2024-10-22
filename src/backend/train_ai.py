
import random
import time
import os
import pickle
from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allows all origins


# simulate training with progress
training_progress = 0
games_played = 0
total_score = 0  # To track the cumulative score across games
best_model = None  # Variable to store the best model info


# AI using Q-learning
class GomokuAI:
    def __init__(self, color, q_table=None, learning_rate=0.1, discount_factor=0.95, exploration_rate=0.1):
        self.color = color  # 'black' or 'white'
        self.q_table = q_table if q_table else {}  # Load Q-table if provided
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.exploration_rate = exploration_rate

    def get_state_key(self, board):
        """Generate a hashable key for the current board state."""
        return str(board)

    def make_move(self, board):
        """AI makes a move based on Q-learning (explore/exploit)"""
        state_key = self.get_state_key(board)
        available_moves = [(r, c) for r in range(len(board)) for c in range(len(board[0])) if board[r][c] is None]

        if random.random() < self.exploration_rate:
            # Exploration: choose a random move
            return random.choice(available_moves)
        else:
            # Exploitation: choose the best move based on Q-table
            if state_key in self.q_table:
                move_values = self.q_table[state_key]
                best_move = max(move_values, key=move_values.get)
                return best_move
            else:
                # If no knowledge of this state, choose randomly
                return random.choice(available_moves)

    def update_q_value(self, old_board, new_board, move, reward):
        """Update Q-value using the Q-learning algorithm."""
        old_state_key = self.get_state_key(old_board)
        new_state_key = self.get_state_key(new_board)

        if old_state_key not in self.q_table:
            self.q_table[old_state_key] = {}

        # Initialize move if not already in Q-table
        if move not in self.q_table[old_state_key]:
            self.q_table[old_state_key][move] = 0

        # Get max future reward for the new state
        future_rewards = self.q_table.get(new_state_key, {})
        max_future_reward = max(future_rewards.values(), default=0)

        # Update Q-value for the old state-action pair
        current_q_value = self.q_table[old_state_key][move]
        new_q_value = current_q_value + self.learning_rate * (reward + self.discount_factor * max_future_reward - current_q_value)
        self.q_table[old_state_key][move] = new_q_value

    def get_reward(self, board, color):
        """Assign a reward based on the current board state."""
        # Reward system: winning = +1, losing = -1, other = 0.1 for getting closer
        if check_winner(board, color):
            return 1  # Win
        elif check_winner(board, 'white' if color == 'black' else 'black'):
            return -1  # Lose
        else:
            # Small reward for each step
            return 0.1


def initialize_board(size=15):
    """Creates an empty 15x15 board"""
    return [[None for _ in range(size)] for _ in range(size)]


def check_winner(board, color):
    """Checks if there's a winner by finding five in a row in any direction."""
    directions = [
        (0, 1),  # horizontal
        (1, 0),  # vertical
        (1, 1),  # diagonal right-down
        (1, -1)  # diagonal left-down
    ]
    grid_size = len(board)

    # Iterate over each cell in the board
    for row in range(grid_size):
        for col in range(grid_size):
            if board[row][col] == color:
                # Check all four directions
                for r_dir, c_dir in directions:
                    count = 1

                    # Check in the positive direction
                    for i in range(1, 5):
                        new_row = row + r_dir * i
                        new_col = col + c_dir * i
                        if 0 <= new_row < grid_size and 0 <= new_col < grid_size and board[new_row][new_col] == color:
                            count += 1
                        else:
                            break

                    # Check in the negative direction
                    for i in range(1, 5):
                        new_row = row - r_dir * i
                        new_col = col - c_dir * i
                        if 0 <= new_row < grid_size and 0 <= new_col < grid_size and board[new_row][new_col] == color:
                            count += 1
                        else:
                            break

                    # Check if we found five in a row
                    if count >= 5:
                        return True
    return False


@app.route('/train', methods=['GET'])
def train():
    global training_progress, games_played, total_score, best_model
    training_progress = 0
    games_played = 0
    total_score = 0  # Reset score at the start of training
    max_total_games = 2  # Max number of games for training

    
    # if have previous model, load it, otherwise start from scratch
    if os.path.exists(os.path.join(os.path.dirname(__file__), "models", "black_ai_model.pkl")):
        black_ai = GomokuAI('black', load_model("black_ai_model"))
    else:
        black_ai = GomokuAI('black')

    if os.path.exists(os.path.join(os.path.dirname(__file__), "models", "white_ai_model.pkl")):
        white_ai = GomokuAI('white', load_model("white_ai_model"))
    else:
        white_ai = GomokuAI('white')




    # Simulate training indefinitely or until a condition is met
    while games_played < max_total_games:
        board = initialize_board()
        current_turn = 'black'
        winner = None
        game_moves = []

        for turn in range(225):  # Max turns in a 15x15 board
            if current_turn == 'black':
                move = black_ai.make_move(board)
                board[move[0]][move[1]] = 'black'
                game_moves.append(('black', board, move))
                if check_winner(board, 'black'):
                    winner = 'black'
                    break
                current_turn = 'white'
            else:
                move = white_ai.make_move(board)
                board[move[0]][move[1]] = 'white'
                game_moves.append(('white', board, move))
                if check_winner(board, 'white'):
                    winner = 'white'
                    break
                current_turn = 'black'

        # Log the result
        if winner:
            print(f"Game {games_played + 1}: {winner} wins")
        else:
            print(f"Game {games_played + 1}: Draw")

        # Reward the moves based on the result of the game
        reward = 1 if winner == 'black' else -1 if winner == 'white' else 0
        total_score += reward  # Update total score
        for color, old_board, move in reversed(game_moves):
            if color == 'black':
                black_ai.update_q_value(old_board, board, move, reward)
            else:
                white_ai.update_q_value(old_board, board, move, -reward)

        games_played += 1
        training_progress = (games_played / max_total_games) * 100  # Update progress as a percentage

    # Save the models (Q-tables) for both AIs
    save_model(black_ai.q_table, "black_ai_model")
    save_model(white_ai.q_table, "white_ai_model")

    # Save the board and result of the last game to a file with the descriptive name
    save_training_output(board, winner, games_played, total_score)

    return jsonify({"progress": training_progress, "games_played": games_played, "best_model": best_model})


def save_training_output(board, winner, games_played, total_score):
    """Saves the final board and result to a file for future analysis with a descriptive name"""
    output_dir = os.path.join(os.path.dirname(__file__), "training_output")
    os.makedirs(output_dir, exist_ok=True)
    
    date_str = datetime.now().strftime("%H_%M_%S_%b_%d_%Y")
    file_name = f"boardIteration_{games_played}_totalScore_{total_score}_time_{date_str}.txt"
    file_path = os.path.join(output_dir, file_name)

    with open(file_path, 'w') as f:
        f.write(f"Winner: {winner}\n")
        f.write(f"Total Score: {total_score}\n")
        for row in board:
            f.write(' '.join([cell if cell else '.' for cell in row]) + '\n')

    print(f"Game saved to {file_path}")


def save_model(q_table, model_name):
    """Saves the Q-table (AI model) to a file using pickle"""
    output_dir = os.path.join(os.path.dirname(__file__), "models")
    os.makedirs(output_dir, exist_ok=True)
    model_path = os.path.join(output_dir, f"{model_name}.pkl")

    with open(model_path, 'wb') as f:
        pickle.dump(q_table, f)

    print(f"Model {model_name} saved to {model_path}")


def load_model(model_name):
    """Loads the Q-table (AI model) from a file using pickle"""
    model_path = os.path.join(os.path.dirname(__file__), "models", f"{model_name}.pkl")
    if os.path.exists(model_path):
        with open(model_path, 'rb') as f:
            q_table = pickle.load(f)
        print(f"Model {model_name} loaded from {model_path}")
        return q_table
    else:
        print(f"Model {model_name} not found, starting from scratch.")
        return None


@app.route('/ai-move', methods=['GET'])
def ai_move():
    if training_progress >= 100:
        return jsonify({"row": random.randint(0, 14), "col": random.randint(0, 14)})
    else:
        return jsonify({"error": "training not complete"}), 400


if __name__ == '__main__':
    app.run(port=5000)

