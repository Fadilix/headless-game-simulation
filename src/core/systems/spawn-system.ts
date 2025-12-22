import type { GameState, SpawnPayload } from "../../types";

export const SpawnSystem = (state: GameState): GameState => {
    const newEntities = { ...state.entities };

    const events = state.scheduledEvents.filter(
        e => e.type === "SPAWN" && e.tick === state.tick
    );

    for (const event of events) {
        const { entityId, components } = event.payload as SpawnPayload;

        // not overriding existing entities
        if (newEntities[entityId]) continue;

        newEntities[entityId] = {
            id: entityId,
            components: { ...components }
        };
    }

    return { ...state, entities: newEntities };
}
