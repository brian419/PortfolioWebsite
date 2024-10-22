'python src/backend/loadandusemodel.py'

import os
import random

class GomokuAI:
    def __init__(self, model_name):
        self.model_name = model_name

    def load_model(self):
        """Loads the AI model from a file"""
        model_path = os.path.join(os.path.dirname(__file__), "training_output", f"{self.model_name}.txt")
        if os.path.exists(model_path):
            with open(model_path, 'r') as f:
                model_data = f.read()
            print(f"Loaded model: {self.model_name}")
            print(model_data)
            return True
        else:
            print(f"Model {self.model_name} not found.")
            return False

    def make_move(self, board):
        """AI makes a move based on the loaded model (random for now)"""
        available_moves = [(r, c) for r in range(len(board)) for c in range(len(board[0])) if board[r][c] is None]
        return random.choice(available_moves)


def load_and_use_model(model_name):
    """Load and use a trained AI model to play a game"""
    ai = GomokuAI(model_name)
    if ai.load_model():
        board = [[None for _ in range(15)] for _ in range(15)]  # Empty 15x15 board
        move = ai.make_move(board)
        print(f"AI ({model_name}) made a move at: {move}")
    else:
        print(f"Failed to load model: {model_name}")


if __name__ == "__main__":
    best_model = "game_10"  # Example of loading a specific model
    load_and_use_model(best_model)
