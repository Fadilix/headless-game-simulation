import type { Entity } from "../types"

export const player: Entity = {
    id: "player-1",
    components: {
        inventory: ["sword", "motolov cocktail", "bondage"],
        health: { max: 100, current: 70 },
        position: { x: 20, y: 20 },
        buffs: [{ name: "speed", duration: 5 }]
    }
}

export const player2: Entity = {
    id: "player-2",
    components: {
        inventory: ["bow", "arrows", "health potion"],
        health: { max: 100, current: 85 },
        position: { x: 25, y: 22 },
        buffs: [{ name: "defense", duration: 10 }]
    }
}

export const enemy: Entity = {
    id: "enemy-1",
    components: {
        inventory: ["motolov cocktail"],
        health: { max: 50, current: 30 },
        position: { x: 17, y: 1 }
    }
}

export const enemy2: Entity = {
    id: "enemy-2",
    components: {
        inventory: ["dagger", "poison"],
        health: { max: 40, current: 40 },
        position: { x: 15, y: 5 }
    }
}

export const boss: Entity = {
    id: "boss-1",
    components: {
        inventory: ["legendary sword", "shield", "armor"],
        health: { max: 500, current: 500 },
        position: { x: 50, y: 50 },
        buffs: [{ name: "rage", duration: 20 }, { name: "defense", duration: 30 }]
    }
}

export const npc: Entity = {
    id: "npc-1",
    components: {
        inventory: ["quest item", "gold"],
        health: { max: 50, current: 50 },
        position: { x: 10, y: 10 }
    }
}

export const weakEnemy: Entity = {
    id: "enemy-3",
    components: {
        inventory: ["stick"],
        health: { max: 20, current: 15 },
        position: { x: 12, y: 8 }
    }
}