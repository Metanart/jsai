import { PreparedForServerEntities } from '@client/types';
import { CollectedEntities } from '@shared/types';
import { EntityTarget, ObjectLiteral } from 'typeorm';

export const prepareEntitiesForServer = (entities: CollectedEntities): PreparedForServerEntities => {
    let results: PreparedForServerEntities = {};

    entities.map((entity) => {
        if (!results[entity.name]) results[entity.name] = [];
        results[entity.name].push(entity.data);
    });

    return results;
};
