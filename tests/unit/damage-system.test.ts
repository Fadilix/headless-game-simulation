import { DamageSystem } from "../../src/core/systems";
import { gameState } from "../../src/data";
import type { GameState } from "../../src/types";

describe("Testing damage system", () => {
    let state: GameState;

    beforeEach(() => {
        state = { ...gameState, tick: 55 };
    });

    test("Testing damage", () => {
        const result = DamageSystem(state);
        const finalBossHealth = result.entities["boss-1"]?.components.health;
        expect(finalBossHealth).toEqual({ current: 450, max: 500 });
    });

    test("Testing damage with non-existent entity", () => {
        state.scheduledEvents.push({
            type: "DAMAGE",
            tick: 55,
            cancelled: false,
            payload: {
                entityId: "non-existent-entity",
                health: { current: -50, max: 100 }
            }
        });

        const result = DamageSystem(state);

        expect(result.entities["non-existent-entity"]).toBeUndefined();
        expect(result.entities).toEqual(state.entities);
    });

    test("Testing damage clamped at zero health", () => {
        state.scheduledEvents.push({
            type: "DAMAGE",
            tick: 55,
            cancelled: false,
            payload: {
                entityId: "boss-1",
                health: { current: -600, max: 500 }
            }
        });

        const result = DamageSystem(state);
        const finalBossHealth = result.entities["boss-1"]?.components.health;

        expect(finalBossHealth).toEqual({ current: 0, max: 500 });
    });

    test("Testing cancelled damage event is ignored", () => {
        const originalHealth = (state.entities["boss-1"]?.components.health as { current: number; max: number }).current;

        state.scheduledEvents.push({
            type: "DAMAGE",
            tick: 55,
            cancelled: true,
            payload: {
                entityId: "boss-1",
                health: { current: -100, max: 500 }
            }
        });

        const result = DamageSystem(state);
        const finalBossHealth = result.entities["boss-1"]?.components.health as { current: number; max: number };

        expect(finalBossHealth?.current).toEqual(originalHealth);
    });
});