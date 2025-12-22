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
    let next = state;

    next = SpawnSystem(next);
    next = MovementSystem(next);
    next = HealthSystem(next);

    return {
        ...next,
        tick: state.tick + 1
    };
}