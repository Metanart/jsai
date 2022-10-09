import { connectDatabase } from '@database';
import { DeepPartial, EntityTarget } from 'typeorm';

export class BaseController<Entity extends { id: string }> {
    constructor(
        private entityTarget: {
            name: string;
        },
    ) {}

    private async getRepository() {
        const db = await connectDatabase;
        return db.getRepository<Entity>(this.entityTarget.name);
    }

    private async createQuery() {
        return (await this.getRepository()).createQueryBuilder(this.entityTarget.name);
    }

    async create(data: DeepPartial<Entity>[]) {
        const newEntities = (await this.getRepository()).create(data);
        return await this.save(newEntities);
    }

    async all() {
        return (await this.getRepository()).find();
    }

    async list(ids: string[]) {
        return await (await this.createQuery()).where(`${this.entityTarget.name}.id IN (:ids)`, { ids }).getMany();
    }

    async save(entities: Entity[]) {
        return await (await this.getRepository()).save<Entity>(entities);
    }

    async remove(entities: Entity[]) {
        return await (await this.getRepository()).remove(entities);
    }
}
