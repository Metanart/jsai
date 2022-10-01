import { EntityName } from '@shared/types';
import { routerConfig } from '@shared/utils/router-config';

type MethodName = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function serverRequest(methodName: MethodName, entityName: EntityName, data: any = {}) {
    const requestUrl = `${routerConfig.url}/${entityName}${data.id ? `/${data.id}` : ''}`;

    console.log(requestUrl);

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

export const sendRequest = {
    getAll: (entityName: EntityName, data: any = {}) => serverRequest('GET', entityName, data),
    getOne: (entityName: EntityName, data: any = {}) => serverRequest('GET', entityName, data),
    create: (entityName: EntityName, data: any = {}) => serverRequest('POST', entityName, data),
    update: (entityName: EntityName, data: any = {}) => serverRequest('PUT', entityName, data),
    deleteOne: (entityName: EntityName, data: any = {}) => serverRequest('DELETE', entityName, data),
};
