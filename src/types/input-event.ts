import type { GameEvent } from "./event";

/* General input event type */
export type InputEvent = GameEvent;

/* Specific input event for moving an entity */
export interface MovePayload {
    entityId: string;
    direction: "NORTH" | "SOUTH" | "EAST" | "WEST";
}

/* Mapping of directions to their corresponding coordinate changes */
export const directionPath = {
    "NORTH": { x: 0, y: 1 },
    "SOUTH": { x: 0, y: -1 },
    "EAST": { x: 1, y: 0 },
    "WEST": { x: -1, y: 0 },
} as const;

