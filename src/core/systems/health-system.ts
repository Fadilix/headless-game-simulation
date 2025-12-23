import { logger } from "../../logger/game-logger";
import { recordEvent } from "../../queries/event-queries";
import type { GameState, HealthPayload } from "../../types";

/**
 * HealthSystem processes HEALTH events to reduce the health of entities.
 */
export const HealthSystem = (state: GameState): GameState => {
    let gameState = { ...state };
    let newEntities = { ...gameState.entities };

    const events = state.scheduledEvents.filter(
        e => e.type === "HEALTH"
            && e.tick === state.tick
            && !e.cancelled
    );

    for (const event of events) {
        logger.log("Health event started");
        const { entityId, health } = event.payload as HealthPayload;

        const entity = newEntities[entityId];
        if (!entity) {
            logger.warn(`Entity with id ${entityId} does not exist`);
            continue;
        }

        const oldHealth = entity.components.health as { current: number; max: number };
        const newHealth = Math.min(oldHealth.max, oldHealth.current + health.current);

        newEntities[entityId] = {
            ...entity,
            components: {
                ...entity.components,
                health: {
                    ...oldHealth,
                    current: newHealth
                }
            }
        };

        const healthUpdate = {
            health: {
                ...oldHealth,
                current: newHealth
            }
        }
        gameState = recordEvent(gameState, event);
        logger.log(`Event recorded: ${JSON.stringify(event, null, 2)}`);

        logger.log(`Entity with id ${entityId} updated health: ${JSON.stringify(healthUpdate, null, 2)}`)
    }

    return { ...gameState, entities: newEntities };
}