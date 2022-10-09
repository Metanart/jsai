export const getPreparedEntity = (id: string, body: any) => {
    if (id !== '') body.id = id;
    return body;
};
