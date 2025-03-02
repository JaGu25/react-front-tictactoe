
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type GameMode = "single" | "multiplayer" | "local";
export type BotDifficulty = "easy" | "medium" | "hard";

export interface GameConfigState {
    isSoundActivate: boolean;
    gameMode: GameMode;
    toggleMusic: () => void;
    botDifficulty: BotDifficulty;
    selectGameMode: (gameMode: GameMode) => void;
    selectBotDifficulty: (botDifficulty: BotDifficulty) => void;
}

const gameConfigStore: StateCreator<GameConfigState> = (set, get) => ({
    isSoundActivate: false,
    botDifficulty: "easy",
    gameMode: "local",
    toggleMusic: () => {
        set({ isSoundActivate: !get().isSoundActivate })
    },
    selectGameMode: (gameMode) => {
        set({ gameMode })
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