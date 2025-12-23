import type { Components } from "./component";
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
 * Base structure for events, parameterized by event type and payload.
 **/
interface BaseEvent<T extends EventType, P> {
    type: T;
    tick: Tick;
    payload: P;
    cancelled?: boolean;
}

/**
 * Represents an event in the game, including its type, the tick it occurs on, and its payload.
 **/
export type GameEvent =
    | BaseEvent<"HEALTH", HealthPayload>
    | BaseEvent<"MOVE", MovePayload>
    | BaseEvent<"DAMAGE", DamagePayload>
    | BaseEvent<"SPAWN", SpawnPayload>;

export interface RecordedEvent {
    tick: Tick;
    event: GameEvent;
}

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
    components: Components
}

/**
 * Payload for damage-related events, similar to health payloads.
 **/
export type DamagePayload = HealthPayload;
