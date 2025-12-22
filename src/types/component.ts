/**
 * A collection of components associated with an entity, each identified by a unique key.
 */
export type Components = Record<string, ComponentValue>

/**
 * The value of a component, which can be a primitive type, an array, or a nested object.
 **/
type ComponentValue =
    | string
    | number
    | null
    | boolean
    | ComponentValue[]
    | { [key: string]: ComponentValue }