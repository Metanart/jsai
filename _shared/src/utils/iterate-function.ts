export function iterateFunction<InputGeneric, OutputGeneric = InputGeneric>(
    entities: InputGeneric[],
    method: Function,
): OutputGeneric[] | undefined {
    const results = entities.map((entity) => method(entity)).filter(Boolean) as OutputGeneric[];
    return results.length > 0 ? results : undefined;
}
