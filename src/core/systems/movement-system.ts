import { directionPath, type GameState, type MovePayload } from "../../types";

/**
 * handles all the movements in our system 
 * @param state 
 * @returns 
 */
export const MovementSystem = (state: GameState): GameState => {
    const newEntities = { ...state.entities };

    const events = state.inputEvents.filter(
        e => e.type === "MOVE"
            && e.tick === state.tick
            && !e.cancelled
    );

    for (const event of events) {
        const { entityId, direction } = event.payload as MovePayload;

        const entity = newEntities[entityId];
        if (!entity) continue;

        const position = entity.components.position as { x: number; y: number };

        const delta = directionPath[direction];

        newEntities[entityId] = {
            ...entity,
            components: {
                ...entity.components,
                position: {
                    x: position.x + delta.x,
                    y: position.y + delta.y
                }
            }
        };
    }

    return { ...state, entities: newEntities };
}
