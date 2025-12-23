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

