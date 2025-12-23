import { tick } from "./src/core/tick";
import { deserializeState, serializeState } from "./src/serializers/serialize";
import { gameState } from "./src/data";

const state = serializeState(gameState);

let restored = deserializeState(state);

setInterval(() => {
  restored = tick(restored);
}, 1000 / 60);