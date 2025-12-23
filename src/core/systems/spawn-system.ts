import { logger } from "../../logger/game-logger";
import { recordEvent } from "../../queries/event-queries";
import type { GameState, SpawnPayload } from "../../types";

/**
 * SpawnSystem processes SPAWN events to add new entities to the game state.
 */
export const SpawnSystem = (state: GameState): GameState => {
    let gameState = { ...state };
    const newEntities = { ...gameState.entities };

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

        gameState = recordEvent(gameState, event);
        logger.log(`Event recorded: ${JSON.stringify(event, null, 2)}`);
        logger.log(`Entity spawned: ${JSON.stringify({ entityId, components }, null, 2)}`);
    }

    return { ...gameState, entities: newEntities };
}
