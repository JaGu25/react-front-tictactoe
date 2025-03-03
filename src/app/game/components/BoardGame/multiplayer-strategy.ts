import { GameModeStrategy } from "@/app/game/domain/game";
import { GameStateRequest } from "@/shared/providers/SocketProvider";
import { useGameConfigStore } from "@/store/game/game-config.store";
import { useGameStore } from "@/store/game/game.store";

interface MultiplayerStrategyProps {
    playerPlay: (data: { roomId: string; gameState: GameStateRequest }) => void,
    resetGame: (roomId: string) => void;
}

export class MultiplayerStrategy implements GameModeStrategy {
    private playerPlay;
    private resetGame;

    constructor({ playerPlay, resetGame }: MultiplayerStrategyProps) {
        this.playerPlay = playerPlay;
        this.resetGame = resetGame;
    }

    handleMove(X: number, Y: number) {
        const { userId, roomId } = useGameConfigStore.getState();
        const { gameState, playerTurn, currentStatus, players } = useGameStore.getState();

        const canPlay = playerTurn === userId;

        if (canPlay) {
            gameState[Y][X] = playerTurn;
            this.playerPlay({
                roomId, gameState: {
                    currentStatus,
                    gameState,
                    players,
                    playerTurn
                }
            });
        }
    }

    resetGameState() {
        const { roomId } = useGameConfigStore.getState();
        this.resetGame(roomId);
    }
}