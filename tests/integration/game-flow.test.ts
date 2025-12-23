import { DamageSystem, HealthSystem, MovementSystem, SpawnSystem } from "../../src/core/systems";
import { gameState } from "../../src/types";

let state = gameState

test("Game flow integration", () => {
    // Initial health check
    expect(state.entities["player-1"]?.components.health).toEqual({ current: 70, max: 100 });
    expect(state.entities["enemy-1"]?.components.health).toEqual({ current: 30, max: 50 });

    // Apply health system
    state = { ...state, tick: 47 };
    state = HealthSystem(state);
    // Post-health system check
    expect(state.entities["player-1"]?.components.health).toEqual({ current: 100, max: 100 });

    state = {
        ...state,
        tick: 53,
        scheduledEvents: [
            ...state.scheduledEvents,
            {
                type: "DAMAGE",
                tick: 53,
                payload: {
                    entityId: "enemy-1",
                    health: { current: -40, max: 0 },
                },
            },
        ],
    }

    state = DamageSystem(state);
    expect(state.entities["enemy-1"]?.components.health).toEqual({ current: 0, max: 50 });

    // initial position check
    expect(state.entities["player-1"]?.components.position).toEqual({ x: 20, y: 20 });
    expect(state.entities["enemy-1"]?.components.position).toEqual({ x: 17, y: 1 });


    state = {
        ...state,
        tick: 60,
        inputEvents: [
            ...state.inputEvents,
            {
                type: "MOVE",
                tick: 60,
                payload: {
                    entityId: "player-1",
                    direction: "EAST"
                },
            },
            {
                type: "MOVE",
                tick: 60,
                payload: {
                    entityId: "enemy-1",
                    direction: "WEST"
                },
            },
        ],
    }

    state = MovementSystem(state);

    // Post-movement system check
    expect(state.entities["player-1"]?.components.position).toEqual({ x: 21, y: 20 });
    expect(state.entities["enemy-1"]?.components.position).toEqual({ x: 16, y: 1 });

    // Spawn check
    expect(state.entities["npc-1"]).toBeUndefined();
    expect(state.entities["npc-2"]).toBeUndefined();

    state = {
        ...state,
        tick: 0,
        scheduledEvents: [
            ...state.scheduledEvents,
            {
                type: "SPAWN",
                tick: 0,
                payload: {
                    entityId: "npc-1",
                    components: {
                        health: { current: 20, max: 20 },
                        position: { x: 5, y: 5 },
                        inventory: []
                    }
                }
            },
            {
                type: "SPAWN",
                tick: 0,
                payload: {
                    entityId: "npc-2",
                    components: {
                        health: { current: 15, max: 15 },
                        position: { x: 10, y: 10 },
                        inventory: []
                    }
                }
            }
        ]
    }
    state = SpawnSystem(state);

    // Post-spawn check
    expect(state.entities["npc-1"]).toBeDefined();
    expect(state.entities["npc-2"]).toBeDefined();
    expect(state.entities["npc-1"]?.components.health).toEqual({ current: 20, max: 20 });
    expect(state.entities["npc-2"]?.components.health).toEqual({ current: 15, max: 15 });
    expect(state.entities["npc-1"]?.components.position).toEqual({ x: 5, y: 5 });
    expect(state.entities["npc-2"]?.components.position).toEqual({ x: 10, y: 10 });

});