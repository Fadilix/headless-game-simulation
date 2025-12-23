import { SpawnSystem } from "../../src/core/systems/spawn-system";
import { gameState } from "../../src/data";


test("Spawn System", () => {
    const state = { ...gameState };

    const newState = SpawnSystem(state);
    expect(newState.entities["enemy-2"]).toBeDefined();
    expect(newState.entities["enemy-2"]!.components.position).toEqual({ x: 15, y: 5 });
});