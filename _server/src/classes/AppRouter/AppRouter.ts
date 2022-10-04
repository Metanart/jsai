import { appDatabase } from '@database';
import { Creature } from '@shared/common/Creature/Creature';
import { Property } from '@shared/common/Property/Property';
import { routerConfig } from '@shared/router/config';
import { RouteName } from '@shared/router/types';
import { buildRouteUrl } from '@shared/router/utils';
import { convertIdsStringToArray } from '@shared/utils/ids-converter';
import bodyParser from 'body-parser';
import cors from 'cors';
import Express from 'express';
import { Request, Response, Router } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';

export const mapRouteNameToEntityTarget: Record<RouteName, EntityTarget<ObjectLiteral>> = {
    Property: Property,
    Creature: Creature,
};

class AppRouter {
    controller = Express();

    constructor() {
        this.controller.use(cors());
        this.controller.use(bodyParser.json());
        routerConfig.routes.map((routeName: RouteName) => {
            this.generateRoutes(routeName);
        });
    }

    generateRoutes(routeName: RouteName) {
        const entityTarget = mapRouteNameToEntityTarget[routeName];

        this.controller.post(buildRouteUrl(routeName), async (request: Request, response: Response) => {
            return this.routeResolver(response, await appDatabase.create(entityTarget, request.body));
        });

        this.controller.get(buildRouteUrl(routeName, true), async (request: Request, response: Response) => {
            return this.routeResolver(
                response,
                await appDatabase.find(entityTarget, convertIdsStringToArray(request.params.id)),
            );
        });

        this.controller.put(buildRouteUrl(routeName), async (request: Request, response: Response) => {
            return this.routeResolver(response, await appDatabase.save(entityTarget, request.body));
        });

        this.controller.delete(buildRouteUrl(routeName, true), async (request: Request, response: Response) => {
            return this.routeResolver(
                response,
                await appDatabase.delete(entityTarget, convertIdsStringToArray(request.params.id)),
            );
        });
    }

    routeResolver(response: Response, results?: any) {
        if (!results) return response.status(404).send();
        return response.send(results);
    }

    start = () => this.controller.listen(routerConfig.port, () => console.log(`Server started at ${routerConfig.url}`));
}

export const appRouter = new AppRouter();
