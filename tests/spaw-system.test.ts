import { SpawnSystem } from "../src/core/systems/spawn-system";
import { gameState, type Event, type GameState } from "../src/types";

test("spawn new enemy at tick 5", () => {
    const spawnEvent : Event = {
        type: "SPAWN",
        tick: 5,
        payload: {
            entityId: "enemy-2",
            components: { position: { x: 10, y: 10 }, health: { current: 50, max: 50 } },
        },
    };

    const state : GameState = {
        ...gameState,
        tick: 5,
        scheduledEvents: [spawnEvent],
    };

    const newState = SpawnSystem(state);
    expect(newState.entities["enemy-2"]).toBeDefined();
    expect(newState.entities["enemy-2"]!.components.position).toEqual({ x: 10, y: 10 });
});