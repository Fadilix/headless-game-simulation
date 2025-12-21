import type { Components } from "./Component"; 

/**
 * An entity within the game, identified by a unique ID and composed of various components.
 **/
export interface Entity {
    readonly id: string;
    // readonly components: Record<string, unknown>
    readonly components: Components
}