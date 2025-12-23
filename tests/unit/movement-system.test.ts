import { MovementSystem } from "../../src/core/systems/movement-system"
import { gameState } from "../../src/data";
import { type GameState } from "../../src/types"

describe("Testing movement system", () => {
    let state: GameState;

    beforeEach(() => {
        state = { 
            ...gameState, 
            tick: 10,
            scheduledEvents: [...gameState.scheduledEvents],
            inputEvents: [...gameState.inputEvents]
        };
    });

    test("Movement System moves entities", () => {
        state.inputEvents.push(
            {
                type: "MOVE",
                tick: 10,
                cancelled: false,
                payload: {
                    entityId: "player-1",
                    direction: "SOUTH",
                },
            },
            {
                type: "MOVE",
                tick: 10,
                cancelled: false,
                payload: {
                    entityId: "enemy-1",
                    direction: "NORTH"
                }
            }
        );

        const result = MovementSystem(state);
        expect(result.entities["player-1"]?.components.position).toEqual({ x: 20, y: 19 });
        expect(result.entities["enemy-1"]?.components.position).toEqual({ x: 17, y: 2 });

        // health didn't change
        expect(result.entities["enemy-1"]?.components.health).toEqual({ current: 30, max: 50 });
        expect(result.entities["player-1"]?.components.health).toEqual({ current: 70, max: 100 });
    });

    test("Testing move with non-existent entity", () => {
        state.inputEvents.push({
            type: "MOVE",
            tick: 10,
            cancelled: false,
            payload: {
                entityId: "non-existent-entity",
                direction: "NORTH"
            }
        });

        const result = MovementSystem(state);

        expect(result.entities["non-existent-entity"]).toBeUndefined();
        expect(result.entities).toEqual(state.entities);
    });

    test("Testing movement in all directions", () => {
        const player1Position = state.entities["player-1"]?.components.position as { x: number; y: number };
        
        // Test NORTH
        state.inputEvents.push({
            type: "MOVE",
            tick: 10,
            cancelled: false,
            payload: { entityId: "player-1", direction: "NORTH" }
        });
        let result = MovementSystem(state);
        expect(result.entities["player-1"]?.components.position).toEqual({ 
            x: player1Position.x, 
            y: player1Position.y + 1 
        });

        // Reset and test EAST
        state = { 
            ...gameState, 
            tick: 10,
            scheduledEvents: [...gameState.scheduledEvents],
            inputEvents: [...gameState.inputEvents]
        };
        state.inputEvents.push({
            type: "MOVE",
            tick: 10,
            cancelled: false,
            payload: { entityId: "player-1", direction: "EAST" }
        });
        result = MovementSystem(state);
        expect(result.entities["player-1"]?.components.position).toEqual({ 
            x: player1Position.x + 1, 
            y: player1Position.y 
        });

        // Reset and test WEST
        state = { 
            ...gameState, 
            tick: 10,
            scheduledEvents: [...gameState.scheduledEvents],
            inputEvents: [...gameState.inputEvents]
        };
        state.inputEvents.push({
            type: "MOVE",
            tick: 10,
            cancelled: false,
            payload: { entityId: "player-1", direction: "WEST" }
        });
        result = MovementSystem(state);
        expect(result.entities["player-1"]?.components.position).toEqual({ 
            x: player1Position.x - 1, 
            y: player1Position.y 
        });
    });

    test("Testing cancelled move event is ignored", () => {
        const originalPosition = state.entities["player-1"]?.components.position as { x: number; y: number };

        state.inputEvents.push({
            type: "MOVE",
            tick: 10,
            cancelled: true,
            payload: {
                entityId: "player-1",
                direction: "NORTH"
            }
        });

        const result = MovementSystem(state);
        const playerPosition = result.entities["player-1"]?.components.position;

        expect(playerPosition).toEqual(originalPosition);
    });
});