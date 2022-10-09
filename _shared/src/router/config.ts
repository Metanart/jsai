import { RouteName } from './types';

const port = 9091;
const url = `http://localhost:${port}`;

const routes: RouteName[] = ['creature'];

export const routerConfig = {
    port,
    url,
    routes,
};
