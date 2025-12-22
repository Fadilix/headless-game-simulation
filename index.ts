import { tick } from "./src/core/tick";
import { gameState } from "./src/types";

let state = gameState;

setInterval(() => {
  state = tick(state);
}, 1000 / 60);