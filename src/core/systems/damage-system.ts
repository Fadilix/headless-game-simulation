import { logger } from "../../logger/game-logger";
import type { GameState, HealthPayload } from "../../types";

export const DamageSystem = (state: GameState): GameState => {
    const newEntities = { ...state.entities };

    const events = state.scheduledEvents.filter(
        e => e.type === "DAMAGE"
            && e.tick === state.tick
            && !e.cancelled
    );

    for (const event of events) {
        logger.log("Damage event started");
        const { entityId, health } = event.payload as HealthPayload;

        const entity = newEntities[entityId];
        if (!entity) {
            logger.warn(`Entity with id ${entityId} does not exist`);
            continue;
        }

        const oldHealth = entity.components.health as { current: number; max: number };
        const newHealth = Math.max(0, oldHealth.current + health.current);

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

        const damageUpdate = {
            health: {
                ...oldHealth,
                current: newHealth
            },
            damageAmount: health.current
        };
        logger.log(`Entity with id ${entityId} took damage: ${JSON.stringify(damageUpdate, null, 2)}`);
    }

    return { ...state, entities: newEntities };
}
