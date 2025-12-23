import { tick } from "./src/core/tick";
import { deserializeState, serializeState } from "./src/serializers/serialize";
import { gameState } from "./src/data";

const state = serializeState(gameState);

let restored = deserializeState(state);

const interval = setInterval(() => {
  restored = tick(restored);

  if (restored.tick >= 65) {
    clearInterval(interval);
  }
}, 1000 / 60);