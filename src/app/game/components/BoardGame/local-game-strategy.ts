import { checkIsGameOver } from "@/app/game/components/BoardGame/general";
import { GameModeStrategy } from "@/app/game/domain/game";
import { useGameStore } from "@/store/game/game.store";

export class LocalGameStrategy implements GameModeStrategy {
  handleMove(X: number, Y: number) {
    const { updateGameState, gameState, playerTurn } = useGameStore.getState();
    gameState[Y][X] = playerTurn;
    updateGameState(gameState);
    checkIsGameOver(playerTurn, gameState);
  }
}