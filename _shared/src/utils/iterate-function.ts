export function iterateFunction<InputEntity, OutputEntity = InputEntity>(
    entities: InputEntity[],
    method: Function,
): OutputEntity[] | undefined {
    const results = entities.map((entity) => method(entity)).filter(Boolean) as OutputEntity[];
    return results.length > 0 ? results : undefined;
}
