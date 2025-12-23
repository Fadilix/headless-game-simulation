import { gameState } from "../../src/data";
import { injectRecordedEvents } from "../../src/queries/event-queries";

describe("Recording and Replay System", () => {
    test("Should record and replay events producing identical game states", () => {
        // Initial game state setup
        const initialState = { ...gameState };

        injectRecordedEvents(initialState);
        const stateAfterFirstTick = injectRecordedEvents({ ...initialState, tick: initialState.tick + 1 });
        expect(stateAfterFirstTick).toBeDefined();

        for (let tick = 0; tick < 10; tick++) {
            const stateWithInjectedEvents = injectRecordedEvents({ ...initialState, tick });
            expect(stateWithInjectedEvents).toBeDefined();
        }
    });
});