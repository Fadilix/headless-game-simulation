import { logger } from "../../logger/game-logger";
import type { GameState, HealthPayload } from "../../types";

export const HealthSystem = (state: GameState): GameState => {
    const newEntities = { ...state.entities };

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
        logger.log(`Entity with id ${entityId} updated health: ${JSON.stringify(healthUpdate, null, 2)}`)
    }

    return { ...state, entities: newEntities };
}