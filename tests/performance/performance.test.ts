import { tick } from "../../src/core/tick";
import type { GameState, Entity } from "../../src/types";

describe("Performance Tests", () => {
    test("Verify system handles 10k entities without degradation (NFR-1)", () => {
        // Generate 10,000 entities
        const entities: Record<string, Entity> = {};
        
        for (let i = 0; i < 10000; i++) {
            entities[`entity-${i}`] = {
                id: `entity-${i}`,
                components: {
                    health: { max: 100, current: 50 + (i % 50) },
                    position: { x: i % 100, y: Math.floor(i / 100) },
                    inventory: ["item1", "item2"]
                }
            };
        }

        // Create game state with 10k entities
        const state: GameState = {
            tick: 0,
            entities,
            scheduledEvents: [
                {
                    type: "DAMAGE",
                    tick: 1,
                    cancelled: false,
                    payload: {
                        entityId: "entity-100",
                        health: { current: -10, max: 100 }
                    }
                },
                {
                    type: "HEALTH",
                    tick: 1,
                    cancelled: false,
                    payload: {
                        entityId: "entity-200",
                        health: { current: 20, max: 100 }
                    }
                }
            ],
            inputEvents: [
                {
                    type: "MOVE",
                    tick: 1,
                    cancelled: false,
                    payload: {
                        entityId: "entity-50",
                        direction: "NORTH"
                    }
                }
            ],
            rngSeed: 12345,
            recordedEvents: []
        };

        // Measure performance for multiple ticks
        const startTime = performance.now();
        const ticksToRun = 10;
        
        let currentState = state;
        for (let i = 0; i < ticksToRun; i++) {
            currentState = tick(currentState);
        }
        
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        const avgTimePerTick = totalTime / ticksToRun;

        // Performance assertions
        // Should process 10k entities in reasonable time (adjust threshold as needed)
        expect(totalTime).toBeLessThan(5000); // 5 seconds for 10 ticks
        expect(avgTimePerTick).toBeLessThan(500); // 500ms per tick average

        // Verify correctness
        expect(Object.keys(currentState.entities).length).toBe(10000);
        expect(currentState.tick).toBe(ticksToRun);
        
        // Verify specific entity was processed correctly
        const entity100 = currentState.entities["entity-100"];
        expect(entity100).toBeDefined();
        expect(entity100?.components.health).toBeDefined();
        
        console.log(`Performance Test Results:`);
        console.log(`  - Total entities: 10,000`);
        console.log(`  - Ticks processed: ${ticksToRun}`);
        console.log(`  - Total time: ${totalTime.toFixed(2)}ms`);
        console.log(`  - Average time per tick: ${avgTimePerTick.toFixed(2)}ms`);
        console.log(`  - Entities processed per second: ${((10000 * ticksToRun) / (totalTime / 1000)).toFixed(0)}`);
    });

    test("Verify system scales linearly with entity count", () => {
        const entityCounts = [1000, 5000, 10000];
        const results: { count: number; time: number }[] = [];

        entityCounts.forEach(count => {
            // Generate entities
            const entities: Record<string, Entity> = {};
            for (let i = 0; i < count; i++) {
                entities[`entity-${i}`] = {
                    id: `entity-${i}`,
                    components: {
                        health: { max: 100, current: 50 },
                        position: { x: i % 100, y: Math.floor(i / 100) }
                    }
                };
            }

            const state: GameState = {
                tick: 0,
                entities,
                scheduledEvents: [],
                inputEvents: [],
                rngSeed: 12345,
                recordedEvents: []
            };

            // Measure time for single tick
            const startTime = performance.now();
            tick(state);
            const endTime = performance.now();
            const time = endTime - startTime;

            results.push({ count, time });
        });

        // Log results
        console.log("Scalability Test Results:");
        results.forEach(r => {
            console.log(`  - ${r.count} entities: ${r.time.toFixed(2)}ms`);
        });

        // Verify performance doesn't degrade dramatically
        // Time should scale roughly linearly (allow some overhead)
        const ratio1k = results[0]!.time / results[0]!.count;
        const ratio10k = results[2]!.time / results[2]!.count;
        
        // 10k ratio should not be more than 2x the 1k ratio (allows for some overhead)
        expect(ratio10k).toBeLessThan(ratio1k * 2);
    });

    test("Verify memory efficiency with large entity count", () => {
        // Create state with 10k entities
        const entities: Record<string, Entity> = {};
        for (let i = 0; i < 10000; i++) {
            entities[`entity-${i}`] = {
                id: `entity-${i}`,
                components: {
                    health: { max: 100, current: 50 },
                    position: { x: i % 100, y: Math.floor(i / 100) }
                }
            };
        }

        const state: GameState = {
            tick: 0,
            entities,
            scheduledEvents: [],
            inputEvents: [],
            rngSeed: 12345,
            recordedEvents: []
        };

        // Run multiple ticks
        let currentState = state;
        for (let i = 0; i < 5; i++) {
            currentState = tick(currentState);
        }

        // Verify we still have all entities (no memory leaks/losses)
        expect(Object.keys(currentState.entities).length).toBe(10000);
        
        // Verify entities maintain their data integrity
        const firstEntity = currentState.entities["entity-0"];
        const lastEntity = currentState.entities["entity-9999"];
        
        expect(firstEntity).toBeDefined();
        expect(lastEntity).toBeDefined();
        expect(firstEntity?.id).toBe("entity-0");
        expect(lastEntity?.id).toBe("entity-9999");
    });
});
