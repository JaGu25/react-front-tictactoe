import { useGameStore } from "@/store/game/game.store";

const valuesToCheck = [
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

export const checkIsGameOver = (playerTurn: string, gameState: string[][]) => {
    const { updateGameCurrentStatus, updatePlayerTurn, players } = useGameStore.getState();
    const [playerOne, playerTwo] = players;

    const someAlreadyWin = valuesToCheck.some((valueToCheck) =>
        valueToCheck.every(([X, Y]) => gameState[X][Y] === playerTurn),
    );

    if (!someAlreadyWin) {
        const boardFilled = gameState.flat().every((value) => value !== "");
        if (boardFilled) {
            return updateGameCurrentStatus("draw");
        }
    }

    if (someAlreadyWin) {
        return updateGameCurrentStatus("done");
    }

    updatePlayerTurn(playerTurn === playerOne ? playerTwo : playerOne);
};


export const isGameOverSimulated = (playerTurn: string, gameState: string[][]): "win" | "draw" | "ongoing" => {
    const someAlreadyWin = valuesToCheck.some((valueToCheck) =>
        valueToCheck.every(([X, Y]) => gameState[X][Y] === playerTurn)
    );

    if (someAlreadyWin) return "win";

    const boardFilled = gameState.flat().every((value) => value !== "");
    if (boardFilled) return "draw";

    return "ongoing";
};