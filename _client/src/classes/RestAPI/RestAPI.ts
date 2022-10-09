import { RouteName } from '@shared/router/types';
import { buildRequestUrl } from '@shared/router/utils';
import { extractEntities } from '@shared/utils/extract-entities';
import { convertIdsParamToArray } from '@shared/utils/ids-converter';

import { RestAPIMethodName } from './RestAPITypes';

export class RestAPI {
    constructor(public routeName: RouteName) {}

    POST = (data: {} | {}[], routeName: RouteName = this.routeName) =>
        this.serverRequest(routeName, 'POST', this.prepareData(data));

    PUT = (data: {} | {}[], routeName: RouteName = this.routeName) =>
        this.serverRequest(routeName, 'PUT', this.prepareData(data));

    DELETE = (data: {} | {}[], routeName: RouteName = this.routeName) =>
        this.serverRequest(routeName, 'DELETE', this.prepareData(data));

    GET = (id: string | string[], routeName: RouteName = this.routeName) =>
        this.serverRequest(routeName, 'GET', {}, convertIdsParamToArray(id));

    prepareData = (data: any) => {
        if (data.toEntity) return data.toEntity();

        if (data.length > 0 && data[0].toEntity) return extractEntities(data);
    };

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
