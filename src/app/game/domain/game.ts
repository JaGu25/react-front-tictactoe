export interface GameModeStrategy {
    handleMove(X: number, Y: number): void;
}