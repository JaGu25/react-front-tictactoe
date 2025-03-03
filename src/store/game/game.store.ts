import { GameStateRequest } from "@/shared/providers/SocketProvider";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type GameCurrentStatus = 'in-progress' | 'draw' | "done";
export type GameStatus = "in-progress" | "draw"
export const initialGameState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

export interface Player {
    name: string;
}
export interface GameState {
    players: string[];
    gameState: string[][];
    playerTurn: string;
    currentStatus: GameCurrentStatus;
    setInitialGameState: (players: string[], gameState?: string[][]) => void;
    updateGameState: (gameState: string[][]) => void;
    updateGameCurrentStatus: (currentStatus: GameCurrentStatus) => void;
    resetGameState: () => void;
    updatePlayerTurn: (playerTurn: string) => void;
    updateFullGame: (gameStateRequest: GameStateRequest) => void;
}

export const storeApi: StateCreator<GameState> = (set, get) => ({
    players: [],
    currentStatus: "in-progress",
    gameState: structuredClone(initialGameState),
    playerTurn: "",
    setInitialGameState: (players, gameState = structuredClone(initialGameState)) => {
        set({ gameState, players, playerTurn: players[0] })
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
        const [playerOne] = get().players;
        set({ gameState: structuredClone(initialGameState), currentStatus: "in-progress", playerTurn: playerOne })
    },
    updateFullGame: (gameStateRequest: GameStateRequest) => {
        set({ ...gameStateRequest })
    }
})

export const useGameStore = create<GameState>()(
    devtools(
        persist(
            storeApi, { name: 'game-storage' }
        )
    )
);