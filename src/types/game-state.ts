import { enemy, player, type Entity } from "./entity";
import { maxHealthEvent, type Event } from "./event";
import { moveEvent } from "./input-event";
import type { Tick } from "./tick";

/**
 * The overall state of the game at a specific tick. 
 **/
export interface GameState {
    readonly tick: Tick;
    readonly entities: Record<string, Entity>;
    readonly scheduledEvents: Event[];
    readonly inputEvents: Event[];
    readonly rngSeed: number;
}

export const gameState: GameState = {
    tick: 10,
    entities: { "player-1": player, "enemy-1": enemy },
    scheduledEvents: [maxHealthEvent],
    inputEvents: [moveEvent],
    rngSeed: 12345,
}