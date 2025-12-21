import type { Tick } from "./Tick";

/**
 * An event that occurs at a specific tick, characterized by its type and associated payload.
 **/
export interface Event {
    readonly type: string;
    readonly tick: Tick;
    readonly payload: unknown;
}