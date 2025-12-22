import type { Components } from "./component";
import type { HealthPayload } from "./event";

/**
 * An entity within the game, identified by a unique ID and composed of various components.
 **/
export interface Entity {
    readonly id: string;
    // readonly components: Record<string, unknown>
    readonly components: Components;
}

export const player: Entity = {
    id: "player-1",
    components: {
        inventory: ["sword", "motolov cocktail", "bondage"],
        health: { max: 100, current: 70 },
        position: { x: 20, y: 20 },
        buffs: [{ name: "speed", duration: 5 }]
    }
}

export const enemy: Entity = {
    id: "enemy-1",
    components: {
        inventory: ["motolov cocktail"],
        health: { max: 50, current: 30 },
        position: { x: 17, y: 1 }
    }
}