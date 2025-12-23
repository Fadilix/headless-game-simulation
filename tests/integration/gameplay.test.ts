import { tick } from "../../src/core/tick";
import { gameState } from "../../src/data";
import { deserializeState, serializeState } from "../../src/serializers/serialize";

describe("Integration Tests - Gameplay and Serialization", () => {
    test("Testing determinism of serialization and deserialization", () => {
        // Setup initial state
        let state = { ...gameState };

        const saved = serializeState(state);
        expect(saved).toBeDefined();

        const restored = deserializeState(saved);

        expect(restored).toEqual(state);
    });

    test("Testing two different game loops produce the same result", () => {
        const gameLoop1 = serializeState(tick(gameState));
        const gameLoop2 = serializeState(tick(gameState));
        expect(gameLoop1).toEqual(gameLoop2);
    });

    test("Testing serialization after several ticks", () => {
        let state = { ...gameState };
        let state2 = { ...gameState };

        for (let i = 0; i < 1000; i++) {
            state = tick(state);
        }

        for (let i = 0; i < 1000; i++) {
            state2 = tick(state2);
        }

        // first state
        const saved = serializeState(state);
        expect(saved).toBeDefined();

        const restored = deserializeState(saved);
        expect(restored).toEqual(state);

        // second state
        const saved2 = serializeState(state2);
        expect(saved2).toBeDefined();

        const restored2 = deserializeState(saved2);
        expect(restored2).toEqual(state2);

        // both states should be equal
        expect(restored).toEqual(restored2);
    });

});