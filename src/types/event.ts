import type { MovePayload } from "./input-event";
import type { Tick } from "./tick";

/**
 * An event that occurs at a specific tick, characterized by its type and associated payload.
 **/
export type EventType = "HEALTH" | "MOVE" | "DAMAGE" | "SPAWN";

/// Identifier for an entity involved in an event
export interface EntityId {
    entityId: string;
}

/**
 * Represents an event in the game, including its type, the tick it occurs on, and its payload.
 **/
export type Event =
    | { type: "HEALTH"; tick: Tick; payload: HealthPayload }
    | { type: "MOVE"; tick: Tick; payload: MovePayload }
    | { type: "DAMAGE"; tick: Tick; payload: DamagePayload }
    | { type: "SPAWN"; tick: Tick; payload: SpawnPayload };

/**
 * Payload for health-related events, including current and maximum health values.
 **/
export type HealthPayload = EntityId & {
    health: {
        current: number;
        max: number;
        shield?: number;
    }
}

/**
 * Payload for spawn events, including the entity ID and its initial position.
 **/
export type SpawnPayload = EntityId & {
    position: { x: number, y: number }
}

/**
 * Payload for damage-related events, similar to health payloads.
 **/
export type DamagePayload = HealthPayload;


export const maxHealthEvent: Event = {
    type: "HEALTH",
    tick: 47,
    payload: { entityId: "player-1", health: { current: 100, max: 100 } } as HealthPayload
}

export const damageEvent: Event = {
    type: "DAMAGE",
    tick: 40,
    payload: { entityId: "enemy-1", health: { current: -10, max: 100 } } as DamagePayload
}

export const spawnEvent: Event = {
    type: "SPAWN",
    tick: 0,
    payload: {
        entityId: "player-1",
        position: { x: 10, y: 10 }
    }
}