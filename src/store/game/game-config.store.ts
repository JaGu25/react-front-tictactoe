
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid';

export type GameMode = "single" | "multiplayer" | "local";
export type BotDifficulty = "easy" | "medium" | "hard";

export interface GameConfigState {
    roomId: string;
    userId: string;
    isSoundActivate: boolean;
    gameMode: GameMode;
    toggleMusic: () => void;
    botDifficulty: BotDifficulty;
    selectGameMode: (gameMode: GameMode) => void;
    selectBotDifficulty: (botDifficulty: BotDifficulty) => void;
    updateRoomId: (roomId: string) => void;
}

const gameConfigStore: StateCreator<GameConfigState> = (set, get) => ({
    roomId: "",
    userId: uuidv4(),
    isSoundActivate: false,
    botDifficulty: "easy",
    gameMode: "local",
    toggleMusic: () => {
        set({ isSoundActivate: !get().isSoundActivate })
    },
    selectGameMode: (gameMode) => {
        set({ gameMode })
    },
    updateRoomId: (roomId) => {
        set({ roomId })
    },
    selectBotDifficulty: (botDifficulty) => {
        set({ botDifficulty })
    },
})

export const useGameConfigStore = create<GameConfigState>()(
    devtools(
        persist(
            gameConfigStore, { name: 'game-config-storage' }
        )
    )
);