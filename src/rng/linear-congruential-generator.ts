

/**
 * random generates a pseudo-random number and the next seed using a linear congruential generator.
 * @param seed The current seed value.
 * @returns A tuple containing the random number and the next seed.
 */
export const random = (seed: number): [number, number] => {
    const a = 1664525;
    const c = 1013904223;
    const m = 2 ** 32;

    const nextSeed = (a * seed + c) >>> 0;
    const randomValue = nextSeed / m;
    return [randomValue, nextSeed];
}


console.log(random(1))