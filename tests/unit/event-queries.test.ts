import { gameState } from "../../src/data";
import { injectRecordedEvents, replayEvents, recordEvent, filterEvents } from "../../src/queries/event-queries";
import type { GameState, GameEvent } from "../../src/types";

describe("Recording and Replay System", () => {
    test("should record events during the simulation", () => {
        let newState = { ...gameState };
        expect(newState).toBeDefined();
        newState = injectRecordedEvents(newState);
        newState = replayEvents(newState);
    });


    test("should inject MOVE events into inputEvents when tick matches", () => {
        const moveEvent: GameEvent = {
            type: "MOVE",
            tick: 5,
            payload: { entityId: "entity-1", direction: "SOUTH" }
        };
        let state: GameState = {
            ...gameState,
            tick: 5,
            recordedEvents: [{ tick: 5, event: moveEvent }]
        };
        state = injectRecordedEvents(state);
        expect(state.inputEvents).toContainEqual(moveEvent);
    });

    test("should inject non-MOVE events into scheduledEvents when tick matches", () => {
        const scheduledEvent: GameEvent = {
            type: "HEALTH",
            tick: 5,
            payload: {
                entityId: "entity-1",
                health: { current: 10, max: 100 }
            }
        };
        let state: GameState = {
            ...gameState,
            tick: 5,
            recordedEvents: [{ tick: 5, event: scheduledEvent }]
        };
        state = injectRecordedEvents(state);
        expect(state.scheduledEvents).toContainEqual(scheduledEvent);
    });

    test("should not inject events when tick does not match", () => {
        const event: GameEvent = {
            type: "MOVE",
            tick: 5,
            payload: { entityId: "entity-1", direction: "NORTH" }
        };
        let state: GameState = {
            ...gameState,
            tick: 10,
            recordedEvents: [{ tick: 5, event }]
        };
        const initialInputLength = state.inputEvents.length;
        const initialScheduledLength = state.scheduledEvents.length;
        state = injectRecordedEvents(state);
        expect(state.inputEvents.length).toBe(initialInputLength);
        expect(state.scheduledEvents.length).toBe(initialScheduledLength);
    });

    test("should handle multiple recorded events at the same tick", () => {
        const moveEvent: GameEvent = {
            type: "MOVE",
            tick: 5,
            payload: { entityId: "entity-1", direction: "EAST" }
        };
        const actionEvent: GameEvent = {
            type: "HEALTH",
            tick: 5,
            payload: { entityId: "entity-2", health: { current: 20, max: 100 } }
        };
        let state: GameState = {
            ...gameState,
            tick: 5,
            recordedEvents: [
                { tick: 5, event: moveEvent },
                { tick: 5, event: actionEvent }
            ]
        };
        state = injectRecordedEvents(state);
        expect(state.inputEvents).toContainEqual(moveEvent);
        expect(state.scheduledEvents).toContainEqual(actionEvent);
    });
});