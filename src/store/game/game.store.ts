
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type GameMode = "single" | "multiplayer" | "local";
export type BotDifficulty = "easy" | "medium" | "hard";
export type GameCurrentStatus = 'in-progress' | 'draw' | "done";
export type GameStatus = "in-progress" | "draw"
export const initialGameState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

export const valuesToCheck = [
    [
        [0, 0],
        [0, 1],
        [0, 2],
    ],
    [
        [1, 0],
        [1, 1],
        [1, 2],
    ],
    [
        [2, 0],
        [2, 1],
        [2, 2],
    ],
    [
        [0, 0],
        [1, 0],
        [2, 0],
    ],
    [
        [0, 1],
        [1, 1],
        [2, 1],
    ],
    [
        [0, 2],
        [1, 2],
        [2, 2],
    ],
    [
        [0, 0],
        [1, 1],
        [2, 2],
    ],
    [
        [0, 2],
        [1, 1],
        [2, 0],
    ],
];

const gameStateBoardInitial: TicTacToeGameBoard = {
    currentStatus: "in-progress",
    gameMode: 'local',
    players: {
        playerOne: {
            name: "",
        },
        playerTwo: {
            name: ""
        },
    },
    gameState: structuredClone(initialGameState),
    playerTurn: "ONE"
};

export type PlayerTurn = "ONE" | "TWO"

export interface TicTacToeGameBoard {
    gameMode: GameMode;
    players: {
        playerOne: Player | undefined;
        playerTwo: Player | undefined;
    }
    gameState: string[][];
    playerTurn: PlayerTurn;
    currentStatus: GameCurrentStatus
}

export interface Player {
    name: string;
}

export interface GameState {
    isSoundActivate: boolean;
    toggleMusic: () => void;
    botDifficulty: BotDifficulty;
    selectGameMode: (gameMode: GameMode) => void;
    selectBotDifficulty: (botDifficulty: BotDifficulty) => void;
    setInitialGameState: (gameBoardState: TicTacToeGameBoard) => void;
    updateGameState: (gameState: string[][]) => void;
    updateGameCurrentStatus: (currentStatus: GameCurrentStatus) => void;
    resetGameState: () => void;
    updatePlayerTurn: (playerTurn: PlayerTurn) => void;
    gameStateBoard: TicTacToeGameBoard;

}

export const storeApi: StateCreator<GameState> = (set, get) => ({
    isSoundActivate: false,
    botDifficulty: "easy",
    gameStateBoard: gameStateBoardInitial,
    setInitialGameState: (gameBoardState: TicTacToeGameBoard) => {
        set({ gameStateBoard: gameBoardState })
    },
    toggleMusic: () => {
        set({ isSoundActivate: !get().isSoundActivate })
    },
    selectGameMode: (gameMode) => {
        set({ gameStateBoard: { ...get().gameStateBoard, gameMode } })
    },
    selectBotDifficulty: (botDifficulty) => {
        set({ botDifficulty })
    },
    updateGameState: (gameState) => {
        set({ gameStateBoard: { ...get().gameStateBoard, gameState } })
    },
    updateGameCurrentStatus: (currentStatus) => {
        set({ gameStateBoard: { ...get().gameStateBoard, currentStatus } })
    },
    updatePlayerTurn: (playerTurn) => {
        set({ gameStateBoard: { ...get().gameStateBoard, playerTurn } })
    },
    resetGameState: () => {
        const currentPlayers = get().gameStateBoard.players;

        set({
            gameStateBoard: {
                ...gameStateBoardInitial,
                gameState: initialGameState,
                players: currentPlayers
            }
        })
    }
})

export const useGameStore = create<GameState>()(
    devtools(
        persist(
            storeApi, { name: 'game-storage' }
        )
    )
);