import type { DamagePayload, GameEvent, HealthPayload, InputEvent, MovePayload, SpawnPayload } from "../types"

// ==== HEALTH EVENTS ====
export const maxHealthEvent: GameEvent = {
    type: "HEALTH",
    tick: 47,
    payload: { entityId: "player-1", health: { current: 100, max: 100 } } as HealthPayload
}

export const healPlayer2Event: GameEvent = {
    type: "HEALTH",
    tick: 25,
    payload: { entityId: "player-2", health: { current: 15, max: 100 } } as HealthPayload
}

export const healEnemyEvent: GameEvent = {
    type: "HEALTH",
    tick: 35,
    payload: { entityId: "enemy-2", health: { current: 10, max: 40 } } as HealthPayload
}

// ==== DAMAGE EVENTS ====
export const damageEvent: GameEvent = {
    type: "DAMAGE",
    tick: 40,
    payload: { entityId: "enemy-1", health: { current: -10, max: 100 } } as DamagePayload
}

export const damagePlayer1Event: GameEvent = {
    type: "DAMAGE",
    tick: 15,
    payload: { entityId: "player-1", health: { current: -20, max: 100 } } as DamagePayload
}

export const damageBossEvent: GameEvent = {
    type: "DAMAGE",
    tick: 55,
    payload: { entityId: "boss-1", health: { current: -50, max: 500 } } as DamagePayload
}

export const massiveDamageBossEvent: GameEvent = {
    type: "DAMAGE",
    tick: 60,
    payload: { entityId: "boss-1", health: { current: -150, max: 500 } } as DamagePayload
}

export const killWeakEnemyEvent: GameEvent = {
    type: "DAMAGE",
    tick: 30,
    payload: { entityId: "enemy-3", health: { current: -20, max: 20 } } as DamagePayload
}

// ==== SPAWN EVENTS ====
export const spawnEvent: GameEvent = {
    type: "SPAWN",
    tick: 0,
    payload: {
        entityId: "player-1",
        components: {
            inventory: ["sword", "motolov cocktail", "bondage"],
            health: { max: 100, current: 100 },
            position: { x: 20, y: 20 },
            buffs: [{ name: "speed", duration: 5 }]
        }
    } as SpawnPayload
}

export const spawnBossEvent: GameEvent = {
    type: "SPAWN",
    tick: 50,
    payload: {
        entityId: "boss-1",
        components: {
            inventory: ["legendary sword", "shield", "armor"],
            health: { max: 500, current: 500 },
            position: { x: 50, y: 50 },
            buffs: [{ name: "rage", duration: 20 }, { name: "defense", duration: 30 }]
        }
    } as SpawnPayload
}

export const spawnNPCEvent: GameEvent = {
    type: "SPAWN",
    tick: 5,
    payload: {
        entityId: "npc-1",
        components: {
            inventory: ["quest item", "gold"],
            health: { max: 50, current: 50 },
            position: { x: 10, y: 10 }
        }
    } as SpawnPayload
}

export const spawnEnemy3Event: GameEvent = {
    type: "SPAWN",
    tick: 10,
    payload: {
        entityId: "enemy-4",
        components: {
            inventory: ["rusty sword"],
            health: { max: 30, current: 30 },
            position: { x: 8, y: 12 }
        }
    } as SpawnPayload
}

// ==== MOVEMENT EVENTS ====
export const moveEvent: InputEvent = {
    type: "MOVE",
    tick: 1,
    payload: { entityId: "player-1", direction: "NORTH" } as MovePayload
};

export const movePlayer1SouthEvent: InputEvent = {
    type: "MOVE",
    tick: 12,
    payload: { entityId: "player-1", direction: "SOUTH" } as MovePayload
};

export const movePlayer1EastEvent: InputEvent = {
    type: "MOVE",
    tick: 18,
    payload: { entityId: "player-1", direction: "EAST" } as MovePayload
};

export const movePlayer1WestEvent: InputEvent = {
    type: "MOVE",
    tick: 22,
    payload: { entityId: "player-1", direction: "WEST" } as MovePayload
};

export const movePlayer2NorthEvent: InputEvent = {
    type: "MOVE",
    tick: 8,
    payload: { entityId: "player-2", direction: "NORTH" } as MovePayload
};

export const moveEnemy1SouthEvent: InputEvent = {
    type: "MOVE",
    tick: 20,
    payload: { entityId: "enemy-1", direction: "SOUTH" } as MovePayload
};

export const moveBossNorthEvent: InputEvent = {
    type: "MOVE",
    tick: 52,
    payload: { entityId: "boss-1", direction: "NORTH" } as MovePayload
};

export const moveBossEastEvent: InputEvent = {
    type: "MOVE",
    tick: 54,
    payload: { entityId: "boss-1", direction: "EAST" } as MovePayload
};
