import { checkIsGameOver, isGameOverSimulated } from "@/app/game/components/BoardGame/general";
import { GameModeStrategy } from "@/app/game/domain/game";
import { BotDifficulty, useGameStore } from "@/store/game/game.store";

export class SingleGameStrategy implements GameModeStrategy {
    private difficulty;

    constructor(difficulty: BotDifficulty) {
        this.difficulty = difficulty;
    }

    handleMove(X: number, Y: number) {
        const { gameStateBoard: { gameState }, updateGameState, } = useGameStore.getState();
        gameState[Y][X] = "ONE";
        updateGameState(gameState);
        checkIsGameOver("ONE", gameState);

        setTimeout(() => {
            const { gameStateBoard: { currentStatus } } = useGameStore.getState();
            const aiMove = this.findBestMove(gameState);
            if (aiMove && currentStatus === "in-progress") {
                gameState[aiMove.Y][aiMove.X] = "TWO";
                updateGameState(gameState);
                checkIsGameOver("TWO", gameState);
            }
        }, 2000);
    }

    private findBestMove(board: string[][]): { X: number; Y: number } | null {
        switch (this.difficulty) {
            case "easy":
                return this.getRandomMove(board);
            case "medium":
                return this.getDefensiveMove(board) || this.getRandomMove(board);
            case "hard":
                return this.minimax(board, "TWO").move;
            default:
                return this.getRandomMove(board);
        }
    }

    private getRandomMove(board: string[][]): { X: number; Y: number } | null {
        const availableMoves: { X: number; Y: number }[] = [];
        for (let Y = 0; Y < board.length; Y++) {
            for (let X = 0; X < board[Y].length; X++) {
                if (board[Y][X] === "") availableMoves.push({ X, Y });
            }
        }
        return availableMoves.length ? availableMoves[Math.floor(Math.random() * availableMoves.length)] : null;
    }

    private getDefensiveMove(board: string[][]): { X: number; Y: number } | null {
        for (let Y = 0; Y < board.length; Y++) {
            for (let X = 0; X < board[Y].length; X++) {
                if (board[Y][X] === "") {
                    board[Y][X] = "ONE";
                    const isWinningMove = isGameOverSimulated("ONE", board) === "win";
                    board[Y][X] = "";
                    if (isWinningMove) return { X, Y };
                }
            }
        }
        return null;
    }

    private minimax(board: string[][], player: "ONE" | "TWO", depth = 0): { score: number; move: { X: number; Y: number } | null } {
        const opponent = player === "TWO" ? "ONE" : "TWO";

        const result = isGameOverSimulated(player, board);
        if (result === "win") return { score: player === "TWO" ? 10 - depth : depth - 10, move: null };
        if (result === "draw") return { score: 0, move: null };

        let bestScore = player === "TWO" ? -Infinity : Infinity;
        let bestMove: { X: number; Y: number } | null = null;

        for (let Y = 0; Y < board.length; Y++) {
            for (let X = 0; X < board[Y].length; X++) {
                if (board[Y][X] === "") {
                    board[Y][X] = player;
                    const score = this.minimax(board, opponent, depth + 1).score;
                    board[Y][X] = "";

                    if ((player === "TWO" && score > bestScore) || (player === "ONE" && score < bestScore)) {
                        bestScore = score;
                        bestMove = { X, Y };
                    }
                }
            }
        }
        return { score: bestScore, move: bestMove };
    }
}