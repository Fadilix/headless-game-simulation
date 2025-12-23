import { gameState } from "../../data";
import { logger } from "../../logger/game-logger";
import { recordEvent } from "../../queries/event-queries";
import { directionPath, type GameState, type MovePayload } from "../../types";

/**
 * MovementSystem processes MOVE input events to update the position of entities.
 */
export const MovementSystem = (state: GameState): GameState => {
    let gameState = { ...state };
    const newEntities = { ...gameState.entities };

    const events = state.inputEvents.filter(
        e => e.type === "MOVE"
            && e.tick === state.tick
            && !e.cancelled
    );

    for (const event of events) {
        logger.log("Move event started");
        const { entityId, direction } = event.payload as MovePayload;

        const entity = newEntities[entityId];
        if (!entity) {
            logger.warn(`Entity with id ${entityId} does not exist`);
            continue;
        }

        const position = entity.components.position as { x: number; y: number };

        const delta = directionPath[direction];
        const newPosition = {
            x: position.x + delta.x,
            y: position.y + delta.y
        };

        newEntities[entityId] = {
            ...entity,
            components: {
                ...entity.components,
                position: newPosition
            }
        };
        gameState = recordEvent(gameState, event);
        logger.log(`Event recorded: ${JSON.stringify(event, null, 2)}`);
        logger.log(`Entity with id ${entityId} moved to: ${JSON.stringify({ position: newPosition, direction }, null, 2)}`);
    }

    return { ...gameState, entities: newEntities };
}
