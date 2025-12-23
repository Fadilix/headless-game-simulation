import { maxHealthEvent, moveEvent } from "../data";
import { type Entity } from "./entity";
import type { GameEvent, RecordedEvent } from "./event";
import type { Tick } from "./tick";

/**
 * The overall state of the game at a specific tick. 
 **/
export interface GameState {
    readonly tick: Tick;
    readonly entities: Record<string, Entity>;
    readonly scheduledEvents: GameEvent[];
    readonly inputEvents: GameEvent[];
    readonly rngSeed: number;
    readonly recordedEvents: RecordedEvent[];
}