import { RouteName } from '@shared/router/types';
import { ObjectLiteral } from 'typeorm';

export type RestAPIMethodName = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type RestAPIGroupedEntities = Partial<Record<RouteName, ObjectLiteral[]>>;

export type RestAPIGroupedEntitiesIds = Partial<Record<RouteName, string[]>>;
