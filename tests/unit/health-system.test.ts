import { HealthSystem } from "../../src/core/systems/health-system";
import { gameState, type GameState } from "../../src/types"


test("Health system", () => {
    let state: GameState = {
        ...gameState,
        tick: 10,
        scheduledEvents: [
            {
                type: "HEALTH",
                tick: 10,
                payload: {
                    entityId: "enemy-1",
                    health: { current: 20, max: 0 },
                },
            },
        ],
    }

    state = HealthSystem(state);
    expect(state.entities["player-1"]?.components.health).toEqual({ current: 70, max: 100 });
    expect(state.entities["enemy-1"]?.components.health).toEqual({ current: 50, max: 50 });
});