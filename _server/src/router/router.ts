import { db } from '@server/database/database';
import { PropertyEntity } from '@shared/classes/common/Property/PropertyEntity';
import { EntityList, EntityName } from '@shared/types';
import { routerConfig } from '@shared/utils/router-config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';

const expressRouter = express();

expressRouter.use(cors());
expressRouter.use(bodyParser.json());

const generateUrl = (entityName: EntityName, hasId = false) => (hasId ? `/${entityName}/:id` : `/${entityName}`);

const mapEntityNameToEntityTarget: Record<EntityName, EntityTarget<ObjectLiteral>> = {
    properties: PropertyEntity,
};

function generateRoutes(entityName: EntityName) {
    const entityTarget: EntityTarget<ObjectLiteral> = mapEntityNameToEntityTarget[entityName];

    // Create new entityTarget
    expressRouter.post(generateUrl(entityName, true), async function (request: Request, response: Response) {
        const results = await db.create(entityTarget, request.body);
        if (!results) return response.status(404).send();
        return response.send(results);
    });

    // Get all entities
    expressRouter.get(generateUrl(entityName), async function (request: Request, response: Response) {
        const results = await db.getAll(entityName);
        if (!results) return response.status(404).send();
        return response.send(results);
    });

    // Get entityTarget by ID
    expressRouter.get(generateUrl(entityName, true), async function (request: Request, response: Response) {
        const results = await db.getOne(entityTarget, request.params.id);
        if (!results) return response.status(404).send();
        return response.send(results);
    });

    // Update entityTarget by ID
    expressRouter.put(generateUrl(entityName, true), async function (request: Request, response: Response) {
        const results = await db.merge(entityTarget, request.params.id, request.body);
        if (!results) return response.status(404).send();
        return response.send(results);
    });

    // Delete entityTarget
    expressRouter.delete(generateUrl(entityName, true), async function (request: Request, response: Response) {
        const results = await db.deleteOne(entityTarget, request.params.id);
        if (!results) return response.status(404).send();
        return response.send(results);
    });
}

EntityList.map((entityName: EntityName) => generateRoutes(entityName));

export const router = {
    start: () => expressRouter.listen(routerConfig.port, () => console.log(`Server started at ${routerConfig.url}`)),
};
