import type { Entity } from "./Entity";
import type { Tick } from "./Tick";

/**
 * The overall state of the game at a specific tick. 
 **/
export interface GameState {
    readonly tick: Tick;
    readonly entities: Record<string, Entity>;
    readonly schedulesEvents: Event[]
}