import type { GameState } from "../types";
import { boss, enemy, enemy2, npc, player, player2, weakEnemy } from "./entities";
import {
    damageBossEvent,
    damageEvent,
    damagePlayer1Event,
    healEnemyEvent,
    healPlayer2Event,
    killWeakEnemyEvent,
    massiveDamageBossEvent,
    maxHealthEvent,
    moveBossEastEvent,
    moveBossNorthEvent,
    moveEnemy1SouthEvent,
    moveEvent,
    movePlayer1EastEvent,
    movePlayer1SouthEvent,
    movePlayer1WestEvent,
    movePlayer2NorthEvent,
    spawnBossEvent,
    spawnEnemy3Event,
    spawnNPCEvent
} from "./events";

export const gameState: GameState = {
    tick: 0,
    entities: {
        "player-1": player,
        "player-2": player2,
        "enemy-1": enemy,
        "enemy-2": enemy2,
        "enemy-3": weakEnemy,
        "npc-1": npc,
        "boss-1": boss
    },
    scheduledEvents: [
        spawnNPCEvent,
        spawnEnemy3Event,
        healPlayer2Event,
        killWeakEnemyEvent,
        healEnemyEvent,
        damageEvent,
        maxHealthEvent,
        spawnBossEvent,
        damageBossEvent,
        massiveDamageBossEvent
    ],
    inputEvents: [
        moveEvent,
        movePlayer2NorthEvent,
        movePlayer1SouthEvent,
        movePlayer1EastEvent,
        moveEnemy1SouthEvent,
        movePlayer1WestEvent,
        moveBossNorthEvent,
        moveBossEastEvent,
        damagePlayer1Event
    ],
    rngSeed: 12345,
    recordedEvents: []
}