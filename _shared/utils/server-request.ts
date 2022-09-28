const serverUrl = '//localhost:9090';

type EntityName = 'properties';

type ActionName = 'getAll' | 'getOne' | 'create' | 'update' | 'delete';

type MethodName = 'GET' | 'POST' | 'PUT' | 'DELETE';

const mapActionNameToMethod: Record<ActionName, MethodName> = {
    getAll: 'GET',
    getOne: 'GET',
    create: 'POST',
    update: 'PUT',
    delete: 'DELETE',
};

export async function serverGetAll(entityName: EntityName, data: any = {}) {
    return serverRequest('getAll', entityName, data);
}

export async function serverRequest(actionName: ActionName, entityName: EntityName, data: any = {}) {
    const requestUrl = `${serverUrl}/${entityName}${data.id ? `/${data.id}` : ''}`;
    const methodName = mapActionNameToMethod[actionName];

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

    return response.json();
}
