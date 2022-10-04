import { RouteName } from '@shared/router/types';
import { buildRequestUrl } from '@shared/router/utils';
import { convertIdsParamToArray } from '@shared/utils/ids-converter';
import { ObjectLiteral } from 'typeorm';

import { RestAPIGroupedEntities, RestAPIGroupedEntitiesIds, RestAPIMethodName } from './RestAPITypes';

class RestAPI {
    entities: RestAPIGroupedEntities = {};
    entitiesIds: RestAPIGroupedEntitiesIds = {};
    results: Partial<Record<RouteName, Promise<any>>> = {};

    send(methodName: RestAPIMethodName) {
        if ((methodName === 'POST' || methodName === 'PUT') && this.entities !== undefined)
            for (const [routeName] of Object.entries(this.entities)) {
                this.results[routeName] = this.sendRoute(routeName as RouteName, methodName);
            }

        if ((methodName === 'GET' || methodName === 'DELETE') && this.entitiesIds !== undefined)
            for (const [routeName] of Object.entries(this.entitiesIds)) {
                this.results[routeName] = this.sendRoute(routeName as RouteName, methodName);
            }

        return this.results;
    }

    sendRoute(routeName: RouteName, methodName: RestAPIMethodName) {
        if ((methodName === 'POST' || methodName === 'PUT') && this.entities[routeName] !== undefined)
            return this[methodName](routeName, this.entities[routeName]!);

        if ((methodName === 'GET' || methodName === 'DELETE') && this.entitiesIds[routeName] !== undefined)
            return this[methodName](routeName, this.entitiesIds[routeName]!);
    }

    hasEntities() {
        return Object.keys(this.entities).length > 0;
    }

    hasEntitiesIds() {
        return Object.keys(this.entitiesIds).length > 0;
    }

    clean() {
        this.entities = {};
        this.entitiesIds = {};
    }

    setEntities(entities: ObjectLiteral[]) {
        this.clean();

        entities.map((entity) => {
            const routeName = entity.constructor.name as RouteName;

            if (!this.entities[routeName]) this.entities[routeName] = [];
            this.entities[routeName]!.push(entity);

            this.setEntitiesIds(routeName, entity.id);
        });

        return this;
    }

    setEntitiesIds(routeName: RouteName, ids: string | string[]) {
        if (!this.entitiesIds[routeName]) this.entitiesIds[routeName] = [];
        this.entitiesIds[routeName]! = convertIdsParamToArray(ids);
        return this;
    }

    POST = (routeName: RouteName, data: {} | {}[]) => this.serverRequest(routeName, 'POST', data);

    PUT = (routeName: RouteName, data: {} | {}[]) => this.serverRequest(routeName, 'PUT', data);

    GET = (routeName: RouteName, id: string | string[]) =>
        this.serverRequest(routeName, 'GET', {}, convertIdsParamToArray(id));

    DELETE = (routeName: RouteName, id: string | string[]) =>
        this.serverRequest(routeName, 'DELETE', {}, convertIdsParamToArray(id));

    async serverRequest(routeName: RouteName, methodName: RestAPIMethodName, data: any, ids?: string[]) {
        const requestUrl = buildRequestUrl(routeName, ids);

        const response = await fetch(requestUrl, {
            method: methodName,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: methodName === 'GET' ? null : JSON.stringify(data),
        });

        if (response.ok) return response.json();

        return new Error('The server request is not fulfilled');
    }
}

export const restApi = new RestAPI();
