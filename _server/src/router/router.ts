import { db } from '@server/database/database';
import { PropertyEntity } from '@shared/classes/common/Property/PropertyEntity';
import { RouteName, RoutesList } from '@shared/types';
import { routerConfig } from '@shared/utils/router-config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';

const expressRouter = express();

expressRouter.use(cors());
expressRouter.use(bodyParser.json());

const generateUrl = (routeName: RouteName, hasId = false) => (hasId ? `/${routeName}/:id` : `/${routeName}`);

const mapEntityNameToEntityTarget: Record<RouteName, EntityTarget<ObjectLiteral>> = {
    properties: PropertyEntity,
};

function generateRoutes(routeName: RouteName) {
    const entityTarget: EntityTarget<ObjectLiteral> = mapEntityNameToEntityTarget[routeName];

    // Create new entityTarget
    expressRouter.post(generateUrl(routeName, true), async function (request: Request, response: Response) {
        const results = await db.create(entityTarget, request.body);
        if (!results) return response.status(404).send();
        return response.send(results);
    });

    // Get all entities
    expressRouter.get(generateUrl(routeName), async function (request: Request, response: Response) {
        const results = await db.getAll(routeName);
        if (!results) return response.status(404).send();
        return response.send(results);
    });

    // Get entityTarget by ID
    expressRouter.get(generateUrl(routeName, true), async function (request: Request, response: Response) {
        const results = await db.getOne(entityTarget, request.params.id);
        if (!results) return response.status(404).send();
        return response.send(results);
    });

    // Update entityTarget by ID
    expressRouter.put(generateUrl(routeName, true), async function (request: Request, response: Response) {
        const results = await db.merge(entityTarget, request.params.id, request.body);
        if (!results) return response.status(404).send();
        return response.send(results);
    });

    // Delete entityTarget
    expressRouter.delete(generateUrl(routeName, true), async function (request: Request, response: Response) {
        const results = await db.deleteOne(entityTarget, request.params.id);
        if (!results) return response.status(404).send();
        return response.send(results);
    });
}

RoutesList.map((routeName: RouteName) => generateRoutes(routeName));

export const router = {
    start: () => expressRouter.listen(routerConfig.port, () => console.log(`Server started at ${routerConfig.url}`)),
};
