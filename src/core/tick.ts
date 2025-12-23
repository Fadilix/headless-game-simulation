import { random } from "../rng/linear-congruential-generator.ts";

import {
    type GameState,
} from "../types";
import { HealthSystem } from "./systems/health-system";
import { MovementSystem } from "./systems/movement-system";
import { SpawnSystem } from "./systems/spawn-system";

/**
 * Core logic of the system where we handle events according to the tick
 **/
export const tick = (state: GameState) => {
    let next = { ...state };
    const [rand, nextSeed] = random(state.rngSeed)

    next = SpawnSystem(next);
    next = MovementSystem(next);
    next = HealthSystem(next);

    if (rand < 0.05) {
        console.log(`Tick ${state.tick} - RNG: ${rand.toFixed(4)} loot dropped`);
    } else {
        console.log(`Tick ${state.tick} - RNG: ${rand.toFixed(4)} no loot`);
    }

    return {
        ...next,
        tick: next.tick + 1,
        rngSeed: nextSeed
    };

}