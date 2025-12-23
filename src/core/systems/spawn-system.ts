import { logger } from "../../logger/game-logger";
import type { GameState, SpawnPayload } from "../../types";

/**
 * SpawnSystem processes SPAWN events to add new entities to the game state.
 */
export const SpawnSystem = (state: GameState): GameState => {
    const newEntities = { ...state.entities };

    const events = state.scheduledEvents.filter(
        e => e.type === "SPAWN"
            && e.tick === state.tick
            && !e.cancelled
    );

    for (const event of events) {
        logger.log("Spawn event started");
        const { entityId, components } = event.payload as SpawnPayload;

        // not overriding existing entities
        if (newEntities[entityId]) {
            logger.warn(`Entity with id ${entityId} already exists, skipping spawn`);
            continue;
        }

        newEntities[entityId] = {
            id: entityId,
            components: { ...components }
        };

        logger.log(`Entity spawned: ${JSON.stringify({ entityId, components }, null, 2)}`);
    }

    return { ...state, entities: newEntities };
}
