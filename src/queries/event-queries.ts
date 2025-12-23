import type { GameEvent, GameState } from "../types";

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

export const recordEvent = (state: GameState, event: GameEvent): GameState => {
    const newRecordedEvents = [...state.recordedEvents, { tick: state.tick, event }];

    return {
        ...state,
        recordedEvents: newRecordedEvents
    };
}


export const injectRecordedEvents = (state: GameState): GameState => {
    let gameState = { ...state };
    const newInputEvents = [...gameState.inputEvents];
    const newScheduledEvents = [...gameState.scheduledEvents];

    for (const recordedEvent of state.recordedEvents) {
        if (recordedEvent.tick === state.tick) {
            const event = recordedEvent.event;
            if (event.type === "MOVE") {
                newInputEvents.push(event);
            } else {
                newScheduledEvents.push(event);
            }
        }
    }

    gameState = {
        ...gameState,
        inputEvents: newInputEvents,
        scheduledEvents: newScheduledEvents
    };

    return gameState;
}


export const replayEvents = (state: GameState): GameState => {
    let gameState = { ...state };

    gameState = injectRecordedEvents(gameState);
    gameState = filterEvents(gameState);

    return gameState;
}