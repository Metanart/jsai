import { Request, Response } from 'express';
import { Router } from 'express-serve-static-core';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

export function generateRoutes(
    entityType: string,
    entity: EntityTarget<ObjectLiteral>,
    router: Router,
    database: DataSource,
) {
    // Create new entity
    router.post(`/${entityType}`, async function (request: Request, response: Response) {
        const newEntity = await database.getRepository(entity).create(request.body);
        const results = await database.getRepository(entity).save(newEntity);
        return response.send(results);
    });

    // Get entity by ID
    router.get(`/${entityType}/:id`, async function (request: Request, response: Response) {
        const results = await database.getRepository(entity).findOneBy({
            id: parseInt(request.params.id),
        });
        return response.send(results);
    });

    // Get all entities
    router.get(`/${entityType}`, async function (request: Request, response: Response) {
        const results = await database.getRepository(entity).find();
        return response.send(results);
    });

    // Update entity by ID
    router.put(`/${entityType}/:id`, async function (request: Request, response: Response) {
        const existingEntity = await database.getRepository(entity).findOneBy({
            id: parseInt(request.params.id),
        });

        if (!existingEntity) return;

        database.getRepository(entity).merge(existingEntity, request.body);
        const results = await database.getRepository(entity).save(existingEntity);
        return response.send(results);
    });

    // Delete entity
    router.delete(`/${entityType}/:id`, async function (request: Request, response: Response) {
        const results = await database.getRepository(entity).delete(request.params.id);
        return response.send(results);
    });
}
