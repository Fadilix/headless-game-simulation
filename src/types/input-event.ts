import type { Event } from "./event";

export type InputEvent = Event;

export interface MovePayload {
    entityId: string;
    direction: "NORTH" | "SOUTH" | "EAST" | "WEST";
}

export const directionPath = {
    "NORTH": { x: 0, y: 1 },
    "SOUTH": { x: 0, y: -1 },
    "EAST": { x: 1, y: 0 },
    "WEST": { x: -1, y: 0 },
} as const;


export const moveEvent: InputEvent = {
    type: "MOVE",
    tick: 1,
    payload: { entityId: "player-1", direction: "NORTH" } as MovePayload
};
