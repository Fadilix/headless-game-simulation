import { tick } from "../../src/core/tick";
import { gameState } from "../../src/data";

test("Testing determinism of game systems", () => {
    const gameLoop1 = tick(gameState);
    const gameLoop2 = tick(gameState);

    expect(gameLoop1).toEqual(gameLoop2);
});