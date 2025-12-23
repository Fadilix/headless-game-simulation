import type { GameState } from "../types";

export const serializeState = (state: GameState) => {
    return JSON.stringify(state);
}

export const deserializeState = (data: string): GameState => {
    return JSON.parse(data) as GameState;
}

