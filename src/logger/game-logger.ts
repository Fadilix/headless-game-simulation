type Level = "INFO" | "WARN" | "ERROR"



export class GameLogger {
    private logs: string[];
    private readonly colors = {
        "INFO": "\x1b[32m",
        "WARN": "\x1b[33m",
        "ERROR": "\x1b[31m",
    }

    private reset = "\x1b[0m";
    private logCount;
    private enabled = true;

    constructor() {
        this.logs = [];
        this.logCount = 0;
    }

    shouldLog() {
        return this.enabled;
    }

    log(message: string, level: Level = "INFO") {
        if (!this.enabled) return;
        const log = `${this.colors[level]}[${level}]${this.reset}: ${message}`;
        this.logs.push(log);
        console.log(log);
        this.logCount++;
    }

    warn(message: string, level: Level = "WARN") {
        this.log(message, level);
    }

    error(message: string, level: Level = "ERROR") {
        this.log(message, level);
    }

    logSummary() {
        console.log(
            `\nLog count : ${this.logCount}\n`
        )
    }
}

export const logger = new GameLogger();
logger.log("hello world");