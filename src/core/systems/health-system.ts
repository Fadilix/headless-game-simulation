import type { GameState, HealthPayload } from "../../types";

export const HealthSystem = (state: GameState): GameState => {
    const newEntities = { ...state.entities };

    const events = state.scheduledEvents.filter(
        e => (e.type === "HEALTH" || e.type === "DAMAGE") && e.tick === state.tick
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
                    current: Math.max(0, oldHealth.current + health.current)
                }
            }
        };
    }

    return { ...state, entities: newEntities };
}
