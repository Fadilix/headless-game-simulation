import type { GameState } from "../types";

export const filterEvents = (state: GameState): GameState => {
    let gameState = { ...state };
    let filteredScheduledEvents = state.scheduledEvents.filter(e => !e.cancelled);
    filteredScheduledEvents = filteredScheduledEvents.sort((a, b) => a.tick - b.tick);
    let filteredInputEvents = state.inputEvents.filter(e => !e.cancelled);
    filteredInputEvents = filteredInputEvents.sort((a, b) => a.tick - b.tick);

    gameState = {
        ...gameState,
        scheduledEvents: [...filteredScheduledEvents],
        inputEvents: [...filteredInputEvents],
    };

    return gameState;
}