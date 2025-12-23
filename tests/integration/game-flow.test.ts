import { DamageSystem, HealthSystem, MovementSystem, SpawnSystem } from "../../src/core/systems";
import { gameState, type GameState } from "../../src/types";

test("Complete game tick integration - all systems working together", () => {
    // Setup a complete game tick with multiple events happening simultaneously
    let state: GameState = {
        ...gameState,
        tick: 100,
        inputEvents: [
            {
                type: "MOVE",
                tick: 100,
                payload: {
                    entityId: "player-1",
                    direction: "EAST"
                },
            },
            {
                type: "MOVE",
                tick: 100,
                payload: {
                    entityId: "enemy-1",
                    direction: "NORTH"
                },
            },
        ],
        scheduledEvents: [
            {
                type: "SPAWN",
                tick: 100,
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
                type: "DAMAGE",
                tick: 100,
                payload: {
                    entityId: "player-1",
                    health: { current: -30, max: 0 },
                },
            },
            {
                type: "HEALTH",
                tick: 100,
                payload: {
                    entityId: "enemy-1",
                    health: { current: 10, max: 0 },
                },
            },
        ]
    };

    // Record initial state
    const initialPlayerHealth = state.entities["player-1"]?.components.health;
    const initialPlayerPosition = state.entities["player-1"]?.components.position;
    const initialEnemyHealth = state.entities["enemy-1"]?.components.health;
    const initialEnemyPosition = state.entities["enemy-1"]?.components.position;

    expect(initialPlayerHealth).toEqual({ current: 70, max: 100 });
    expect(initialPlayerPosition).toEqual({ x: 20, y: 20 });
    expect(initialEnemyHealth).toEqual({ current: 30, max: 50 });
    expect(initialEnemyPosition).toEqual({ x: 17, y: 1 });
    expect(state.entities["npc-1"]).toBeUndefined();

    // Run all systems in game loop order (simulating one complete tick)
    state = SpawnSystem(state);
    state = MovementSystem(state);
    state = HealthSystem(state);
    state = DamageSystem(state);

    // Verify combined effects of all systems working together

    // 1. NPC was spawned successfully
    expect(state.entities["npc-1"]).toBeDefined();
    expect(state.entities["npc-1"]?.components.health).toEqual({ current: 20, max: 20 });
    expect(state.entities["npc-1"]?.components.position).toEqual({ x: 5, y: 5 });

    // 2. Player moved AND took damage (both systems affected same entity)
    expect(state.entities["player-1"]?.components.position).toEqual({ x: 21, y: 20 }); // Moved EAST
    expect(state.entities["player-1"]?.components.health).toEqual({ current: 40, max: 100 }); // 70 - 30 damage

    // 3. Enemy moved AND healed (both systems affected same entity)
    expect(state.entities["enemy-1"]?.components.position).toEqual({ x: 17, y: 2 }); // Moved NORTH (y: 1 + 1 -> 2)
    expect(state.entities["enemy-1"]?.components.health).toEqual({ current: 40, max: 50 }); // 30 + 10 health
});