import { DamageSystem } from "../../src/core/systems";
import { gameState } from "../../src/data";
import type { GameState } from "../../src/types";



describe("Testing damage system", () => {
    let state: GameState;

    beforeEach(() => {
        const state = { ...gameState, tick: 55 };
        return state;
    });

    test("Testing damage", () => {

        let newState = { ...gameState, tick: 55 }

        newState = DamageSystem(newState);

        const finalBossHealth = newState.entities["boss-1"]?.components.health
        expect(finalBossHealth).toEqual({ current: 450, max: 500 });

    });

    // test("Entity 67 does not exist test", () => {
    //     state = {
    //         ...state,
    //         tick : 67,
    //     }
    //     state = DamageSystem(state);

    //     const entityDoesNotExist = state.entities["boss-7"]
    //     expect(entityDoesNotExist).toBeUndefined()
    // });
});