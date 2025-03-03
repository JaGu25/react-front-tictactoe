import { checkIsGameOver, isGameOverSimulated } from "@/app/game/components/BoardGame/general";
import { GameModeStrategy } from "@/app/game/domain/game";
import { BotDifficulty } from "@/store/game/game-config.store";
import { useGameStore } from "@/store/game/game.store";

export class SingleGameStrategy implements GameModeStrategy {
    private difficulty: BotDifficulty;

    constructor(difficulty: BotDifficulty) {
        this.difficulty = difficulty;
    }

    handleMove(X: number, Y: number) {
        const { gameState, updateGameState, players } = useGameStore.getState();
        const [playerOne, playerTwo] = players;
        gameState[Y][X] = playerOne;
        updateGameState(gameState);
        checkIsGameOver(playerOne, gameState);

        setTimeout(() => {
            const { currentStatus, playerTurn } = useGameStore.getState();
            const aiMove = this.findBestMove(gameState);
            if (aiMove && currentStatus === "in-progress" && playerTurn === playerTwo) {
                gameState[aiMove.Y][aiMove.X] = playerTwo;
                updateGameState(gameState);
                checkIsGameOver(playerTwo, gameState);
            }
        }, 1500);
    }

    resetGameState(): void {
        const { resetGameState } = useGameStore.getState();
        resetGameState();
    }

    private findBestMove(board: string[][]): { X: number; Y: number } | null {
        switch (this.difficulty) {
            case "easy":
                return this.getRandomMove(board);
            case "medium":
                return this.getDefensiveMove(board) || this.getRandomMove(board);
            case "hard":
                return this.minimax(board, useGameStore.getState().players[1]).move;
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
        const [playerOne] = useGameStore.getState().players;
        for (let Y = 0; Y < board.length; Y++) {
            for (let X = 0; X < board[Y].length; X++) {
                if (board[Y][X] === "") {
                    board[Y][X] = playerOne;
                    const isWinningMove = isGameOverSimulated(playerOne, board) === "win";
                    board[Y][X] = "";
                    if (isWinningMove) return { X, Y };
                }
            }
        }
        return null;
    }

    private minimax(board: string[][], player: string, depth = 0): { score: number; move: { X: number; Y: number } | null } {
        const [playerOne, playerTwo] = useGameStore.getState().players;
        const opponent = player === playerTwo ? playerOne : playerTwo;

        const result = isGameOverSimulated(player, board);
        if (result === "win") return { score: player === playerTwo ? 10 - depth : depth - 10, move: null };
        if (result === "draw") return { score: 0, move: null };

        let bestScore = player === playerTwo ? -Infinity : Infinity;
        let bestMove: { X: number; Y: number } | null = null;

        for (let Y = 0; Y < board.length; Y++) {
            for (let X = 0; X < board[Y].length; X++) {
                if (board[Y][X] === "") {
                    board[Y][X] = player;
                    const score = this.minimax(board, opponent, depth + 1).score;
                    board[Y][X] = "";

                    if ((player === playerTwo && score > bestScore) || (player === playerOne && score < bestScore)) {
                        bestScore = score;
                        bestMove = { X, Y };
                    }
                }
            }
        }
        return { score: bestScore, move: bestMove };
    }
}
