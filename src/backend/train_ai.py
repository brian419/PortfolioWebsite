
import random
import time
import os
import pickle
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from datetime import datetime

app = Flask(__name__)
frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
CORS(app, resources={r"/*": {"origins": frontend_origin}}, supports_credentials=True)



# simulate training with progress
training_progress = 0
games_played = 0
total_score = 0  
best_model = None  


# Q-learning
class GomokuAI:
    def __init__(self, color, q_table=None, learning_rate=0.1, discount_factor=0.95, exploration_rate=0.1):
        self.color = color  # 'black' or 'white'
        self.q_table = q_table if q_table else {}  
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

        if random.random() < self.exploration_rate: # exploration: choose a random move
            return random.choice(available_moves)
        else:
            # exploitation: choose the best move based on Q-table
            if state_key in self.q_table:
                move_values = self.q_table[state_key]
                best_move = max(move_values, key=move_values.get)
                return best_move
            else:
                # if no knowledge of this state, choose randomly
                return random.choice(available_moves)

    def update_q_value(self, old_board, new_board, move, reward):
        """Update Q-value using the Q-learning algorithm."""
        old_state_key = self.get_state_key(old_board)
        new_state_key = self.get_state_key(new_board)

        if old_state_key not in self.q_table:
            self.q_table[old_state_key] = {}

        # initialize move if not already in Q-table
        if move not in self.q_table[old_state_key]:
            self.q_table[old_state_key][move] = 0

        # get max future reward for the new state
        future_rewards = self.q_table.get(new_state_key, {})
        max_future_reward = max(future_rewards.values(), default=0)

        # update Q-value for the old state-action pair
        current_q_value = self.q_table[old_state_key][move]
        new_q_value = current_q_value + self.learning_rate * (reward + self.discount_factor * max_future_reward - current_q_value)
        self.q_table[old_state_key][move] = new_q_value

    def get_reward(self, board, color):
        """Assign a reward based on the current board state."""
        # current reward system: winning = +1, losing = -1, other = 0.1 for getting closer
        if check_winner(board, color):
            return 1  
        elif check_winner(board, 'white' if color == 'black' else 'black'):
            return -1  
        else:
            return 0.1
        

        # new idea for reward system:
        # winning = +1, losing = -1, other = 0.1, win in smaller number of moves = higher reward, win in larger number of moves = lower reward


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

    # iterates over each cell in the board
    for row in range(grid_size):
        for col in range(grid_size):
            if board[row][col] == color:
                # checks all four directions
                for r_dir, c_dir in directions:
                    count = 1

                    # checks in the positive direction
                    for i in range(1, 5):
                        new_row = row + r_dir * i
                        new_col = col + c_dir * i
                        if 0 <= new_row < grid_size and 0 <= new_col < grid_size and board[new_row][new_col] == color:
                            count += 1
                        else:
                            break

                    # checks in the negative direction
                    for i in range(1, 5):
                        new_row = row - r_dir * i
                        new_col = col - c_dir * i
                        if 0 <= new_row < grid_size and 0 <= new_col < grid_size and board[new_row][new_col] == color:
                            count += 1
                        else:
                            break

                    # checks if we found five in a row
                    if count >= 5:
                        return True
    return False


@app.route('/train', methods=['GET'])
def train():
    print("Connected to train_ai.py for /train")
    global training_progress, games_played, total_score, best_model
    training_progress = 0
    games_played = 0
    total_score = 0  # resets score at the start of training
    max_total_games = 2  # max number of games for training

    
    # if have previous model, load it, otherwise start from scratch
    if os.path.exists(os.path.join(os.path.dirname(__file__), "models", "black_ai_model.pkl")):
        black_ai = GomokuAI('black', load_model("black_ai_model"))
    else:
        black_ai = GomokuAI('black')

    if os.path.exists(os.path.join(os.path.dirname(__file__), "models", "white_ai_model.pkl")):
        white_ai = GomokuAI('white', load_model("white_ai_model"))
    else:
        white_ai = GomokuAI('white')




    # training loop
    while games_played < max_total_games:
        board = initialize_board()
        current_turn = 'black'
        winner = None
        game_moves = []

        for turn in range(225):  # max turns in a 15x15 board
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

        # logs the result
        if winner:
            print(f"Game {games_played + 1}: {winner} wins")
        else:
            print(f"Game {games_played + 1}: Draw")

        # rewards the moves based on the result of the game
        reward = 1 if winner == 'black' else -1 if winner == 'white' else 0
        total_score += reward  # updates total score
        for color, old_board, move in reversed(game_moves):
            if color == 'black':
                black_ai.update_q_value(old_board, board, move, reward)
            else:
                white_ai.update_q_value(old_board, board, move, -reward)

        games_played += 1
        training_progress = (games_played / max_total_games) * 100  # Update progress as a percentage

    # saves the models (Q-tables) for both AIs
    save_model(black_ai.q_table, "black_ai_model")
    save_model(white_ai.q_table, "white_ai_model")

    # saves the board and result of the last game to a file with the descriptive name
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


@app.route('/ai-move-2', methods=['POST'])
@cross_origin(origin="http://localhost:3000", supports_credentials=True)
def ai_move_2():
    print("Connected to ai-move-2")

    model_path = os.path.join(os.path.dirname(__file__), "models", "white_ai_model.pkl") 
    if not os.path.exists(model_path):
        return jsonify({"error": "AI model not found"}), 400

    with open(model_path, 'rb') as f:
        q_table = pickle.load(f)
    white_ai = GomokuAI('white', q_table)

    board = request.json.get("board")
    print("Received board:", board)  

    if board:
        move = white_ai.make_move(board)
        return jsonify({"row": move[0], "col": move[1]})
    else:
        return jsonify({"error": "Board state is missing"}), 400

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)




