import { routerConfig } from './config';
import { RouteName } from './types';

export const buildRequestUrl = (routeName: RouteName, ids?: string[]) => {
    let url = `${routerConfig.url}/${routeName}`;
    if (ids && ids.length === 1) url = `${url}/${ids[0]}`;
    if (ids && ids.length > 1) url = `${url}/${ids.join(';')}`;
    return url;
};

export const buildRouterUrl = (routeName: RouteName, hasId?: boolean) => {
    let url = `/${routeName}`;
    if (hasId) url = `${url}/:id`;
    return url;
};
