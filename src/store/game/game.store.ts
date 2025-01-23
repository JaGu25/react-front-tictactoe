
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type GameMode = "single" | "multiplayer" | "local";
export type BotDifficulty = "easy" | "medium" | "hard";

export interface GameState {
    isSoundActivate: boolean;
    toggleMusic: () => void;
    gameMode: GameMode;
    botDifficulty: BotDifficulty;
    selectGameMode: (gameMode: GameMode) => void;
    selectBotDifficulty: (botDifficulty: BotDifficulty) => void;

}

export const storeApi: StateCreator<GameState> = (set, get) => ({
    isSoundActivate: true,
    gameMode: "single",
    botDifficulty: "easy",
    toggleMusic: () => {
        set({ isSoundActivate: !get().isSoundActivate })
    },
    selectGameMode: (gameMode) => {
        set({ gameMode })
    },
    selectBotDifficulty: (botDifficulty) => {
        set({ botDifficulty })
    }

})

export const useGameStore = create<GameState>()(
    devtools(
        persist(
            storeApi, { name: 'game-storage' }
        )
    )
);