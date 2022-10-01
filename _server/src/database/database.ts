import { PropertyEntity } from '@shared/classes/common/Property/PropertyEntity';
import { DataSource } from 'typeorm';
import { EntityTarget, ObjectLiteral } from 'typeorm';

const dataSource: DataSource = new DataSource({
    type: 'sqlite',
    synchronize: true,
    database: '_server/database.db',
    entities: [PropertyEntity],
});

dataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((error: Error) => {
        console.error('Error during Data Source initialization', error);
    });

const getOne = async (entityTarget: EntityTarget<ObjectLiteral>, id: number | string) => {
    return await dataSource.getRepository(entityTarget).findOneBy({ id });
};

const getAll = async (entityTarget: EntityTarget<ObjectLiteral>) => {
    return await dataSource.getRepository(entityTarget).find();
};

const save = async (entityTarget: EntityTarget<ObjectLiteral>, newEntity: ObjectLiteral) => {
    return await dataSource.getRepository(entityTarget).save(newEntity);
};

const deleteOne = async (entityTarget: EntityTarget<ObjectLiteral>, id: number | string) => {
    return await dataSource.getRepository(entityTarget).delete(id);
};

const create = async (entityTarget: EntityTarget<ObjectLiteral>, data: any) => {
    const createdEntity = dataSource.getRepository(entityTarget).create(data);
    return save(entityTarget, createdEntity);
};

const merge = async (
    entityTarget: EntityTarget<ObjectLiteral>,
    existingEntityId: number | string,
    updatedEnity: ObjectLiteral,
) => {
    const existingEntity = await getOne(entityTarget, existingEntityId);

    if (!existingEntity) return null;

    dataSource.getRepository(entityTarget).merge(existingEntity, updatedEnity);

    return await save(entityTarget, existingEntity);
};

export const db = { source: dataSource, save, create, getOne, getAll, deleteOne, merge };
