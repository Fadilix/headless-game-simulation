import { HealthSystem } from "../../src/core/systems/health-system";
import { gameState } from "../../src/data";
import { type GameState } from "../../src/types"

describe("Testing health system", () => {
    let state: GameState;

    beforeEach(() => {
        state = { ...gameState, tick: 10 };
    });

    test("Health system heals entity", () => {
        state.scheduledEvents.push({
            type: "HEALTH",
            tick: 10,
            cancelled: false,
            payload: {
                entityId: "enemy-1",
                health: { current: 20, max: 0 },
            },
        });

        const result = HealthSystem(state);
        expect(result.entities["player-1"]?.components.health).toEqual({ current: 70, max: 100 });
        expect(result.entities["enemy-1"]?.components.health).toEqual({ current: 50, max: 50 });
    });

    test("Testing heal with non-existent entity", () => {
        state.scheduledEvents.push({
            type: "HEALTH",
            tick: 10,
            cancelled: false,
            payload: {
                entityId: "non-existent-entity",
                health: { current: 50, max: 100 }
            }
        });

        const result = HealthSystem(state);

        expect(result.entities["non-existent-entity"]).toBeUndefined();
        expect(result.entities).toEqual(state.entities);
    });

    test("Testing health clamped at max health", () => {
        state.scheduledEvents.push({
            type: "HEALTH",
            tick: 10,
            cancelled: false,
            payload: {
                entityId: "player-1",
                health: { current: 100, max: 100 }
            }
        });

        const result = HealthSystem(state);
        const playerHealth = result.entities["player-1"]?.components.health;

        expect(playerHealth).toEqual({ current: 100, max: 100 });
    });

    test("Testing cancelled health event is ignored", () => {
        const originalHealth = (state.entities["player-1"]?.components.health as { current: number; max: number }).current;

        state.scheduledEvents.push({
            type: "HEALTH",
            tick: 10,
            cancelled: true,
            payload: {
                entityId: "player-1",
                health: { current: 30, max: 100 }
            }
        });

        const result = HealthSystem(state);
        const playerHealth = result.entities["player-1"]?.components.health as { current: number; max: number };

        expect(playerHealth?.current).toEqual(originalHealth);
    });
});