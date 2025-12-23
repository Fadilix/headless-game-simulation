import type { GameState, HealthPayload } from "../../types";

export const HealthSystem = (state: GameState): GameState => {
    const newEntities = { ...state.entities };

    const events = state.scheduledEvents.filter(
        e => e.type === "HEALTH"
            && e.tick === state.tick
            && !e.cancelled
    );

    for (const event of events) {
        const { entityId, health } = event.payload as HealthPayload;

        const entity = newEntities[entityId];
        if (!entity) continue;

        const oldHealth = entity.components.health as { current: number; max: number };

        newEntities[entityId] = {
            ...entity,
            components: {
                ...entity.components,
                health: {
                    ...oldHealth,
                    current: Math.min(oldHealth.max, oldHealth.current + health.current)
                }
            }
        };
    }

    return { ...state, entities: newEntities };
}
