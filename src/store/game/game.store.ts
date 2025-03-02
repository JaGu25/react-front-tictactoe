import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type GameCurrentStatus = 'in-progress' | 'draw' | "done";
export type GameStatus = "in-progress" | "draw"
export const initialGameState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

export type PlayerTurn = "ONE" | "TWO"

export interface Player {
    name: string;
}
export interface GameState {
    players: string[];
    gameState: string[][];
    playerTurn: PlayerTurn;
    currentStatus: GameCurrentStatus;
    setInitialGameState: (players: string[]) => void;
    updateGameState: (gameState: string[][]) => void;
    updateGameCurrentStatus: (currentStatus: GameCurrentStatus) => void;
    resetGameState: () => void;
    updatePlayerTurn: (playerTurn: PlayerTurn) => void;
}

export const storeApi: StateCreator<GameState> = (set, get) => ({
    players: ["", ""],
    currentStatus: "in-progress",
    gameState: structuredClone(initialGameState),
    playerTurn: "ONE",
    setInitialGameState: (players) => {
        set({ gameState: structuredClone(initialGameState), players })
    },
    updateGameState: (gameState) => {
        set({ gameState })
    },
    updateGameCurrentStatus: (currentStatus) => {
        set({ currentStatus })
    },
    updatePlayerTurn: (playerTurn) => {
        set({ playerTurn })
    },
    resetGameState: () => {
        set({ gameState: structuredClone(initialGameState), currentStatus: "in-progress", playerTurn: "ONE" })
    }
})

export const useGameStore = create<GameState>()(
    devtools(
        persist(
            storeApi, { name: 'game-storage' }
        )
    )
);