import { MovementSystem } from "../../src/core/systems/movement-system"
import { gameState } from "../../src/data";
import { type GameState } from "../../src/types"

let state: GameState = gameState;

test("Movement System", () => {
    state = {
        ...state,
        tick: 10,
        inputEvents: [
            {
                type: "MOVE",
                tick: 10,
                payload: {
                    entityId: "player-1",
                    direction: "SOUTH",
                },
            },
            {
                type: "MOVE",
                tick: 10,
                payload: {
                    entityId: "enemy-1",
                    direction: "NORTH"
                }
            }
        ],
    }
    state = MovementSystem(state);
    expect(state.entities["player-1"]?.components.position).toEqual({ x: 20, y: 19 });
    expect(state.entities["enemy-1"]?.components.position).toEqual({ x: 17, y: 2 });

    // health didn't change
    expect(state.entities["enemy-1"]?.components.health).toEqual({ current: 30, max: 50 });
    expect(state.entities["player-1"]?.components.health).toEqual({ current: 70, max: 100 });
});