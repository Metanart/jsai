import { EntityTarget, ObjectLiteral } from 'typeorm';

export type PreparedForServerEntities = Record<string, EntityTarget<ObjectLiteral>[]>;
