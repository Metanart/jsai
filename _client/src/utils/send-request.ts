import { ClassName, RouteName } from '@shared/types';
import { routerConfig } from '@shared/utils/router-config';

type MethodName = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function serverRequest(methodName: MethodName, routeName: RouteName, data: any = {}) {
    const requestUrl = `${routerConfig.url}/${routeName}${data.id ? `/${data.id}` : ''}`;

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

const getAll = (routeName: RouteName, data: any = {}) => serverRequest('GET', routeName, data);

const getOne = (routeName: RouteName, data: any = {}) => serverRequest('GET', routeName, data);

const create = (routeName: RouteName, data: any = {}) => serverRequest('POST', routeName, data);

const update = (routeName: RouteName, data: any = {}) => serverRequest('PUT', routeName, data);

const deleteOne = (routeName: RouteName, data: any = {}) => serverRequest('DELETE', routeName, data);

const createStack = (entities: { name: ClassName; data: any }[]) => {
    entities.map((entity) => {});
};

export const sendRequest = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
};
