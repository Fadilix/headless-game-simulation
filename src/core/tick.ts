import {
    directionPath,
    type Entity,
    type Event,
    type GameState,
    type SpawnPayload,
} from "../types";

/**
 * Core logic of the system where we handle events according to the tick
 **/
export const tick = (state: GameState, events: Event[]) => {
    const newEntities: Record<string, Entity> = { ...state.entities }

    for (let event of events) {
        if (event.tick !== state.tick) continue;

        if (event.type === "HEALTH") {
            const entityId = event.payload.entityId;
            const health = event.payload.health;

            if (newEntities[entityId]) {
                const oldEntry = newEntities[entityId];
                const newComponents = { ...oldEntry.components, health };
                newEntities[entityId] = { ...oldEntry, components: newComponents };
            }
        }

        if (event.type === "MOVE") {
            const entityId = event.payload.entityId;
            const direction = event.payload.direction;

            if (newEntities[entityId]) {
                const oldEntry = newEntities[entityId];
                const position = oldEntry.components.position as { x: number, y: number }

                const newX = position.x + directionPath[direction].x;
                const newY = position.y + directionPath[direction].y;

                const newComponents = { ...oldEntry.components, position: { x: newX, y: newY } }
                newEntities[entityId] = { ...oldEntry, components: newComponents }
            }
        }

        if (event.type === "DAMAGE") {
            const entityId = event.payload.entityId;

            if (newEntities[entityId]) {
                const damage = event.payload.health;
                const oldEntry = newEntities[entityId];

                const health = oldEntry.components.health as { current: number, max: number };
                const newHealth = {
                    ...health,
                    current: Math.max(0, health.current + damage.current)
                }

                const newComponents = { ...oldEntry.components, health: newHealth };
                newEntities[entityId] = { ...oldEntry, components: newComponents }
            }
        }

        if (event.type === "SPAWN") {
            const entityId = (event.payload as SpawnPayload).entityId;

            if (newEntities[entityId]) {
                const oldEntry = newEntities[entityId];

                const position = oldEntry.components.position as { x: number, y: number }
                const newPosition = { x: position.x, y: position.y }

                const newComponents = { ...oldEntry.components, position: newPosition }
                newEntities[entityId] = { ...oldEntry, components: newComponents }
            }
        }
    }

    return { ...state, entities: newEntities }
}