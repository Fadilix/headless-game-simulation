import { GameLogger } from "../../src/logger/game-logger";

describe("Testing game logger", () => {
    test("Is logging correctfully", () => {
        const logger = new GameLogger();
        logger.log("This is an info message");
        logger.warn("This is a warning message");
        logger.error("This is an error message");
        logger.logSummary();

        expect(logger.shouldLog()).toBe(true);
    });
});