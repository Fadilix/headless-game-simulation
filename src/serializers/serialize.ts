import type { GameState } from "../types";

/**
 * serializeState converts the GameState into a JSON string.
 * deserializeState parses a JSON string back into a GameState.
 */
export const serializeState = (state: GameState) => {
    return JSON.stringify(state);
}

/**
 *  deserializeState parses a JSON string back into a GameState.
 */
export const deserializeState = (data: string): GameState => {
    return JSON.parse(data) as GameState;
}

