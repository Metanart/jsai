import { Creature } from '@shared/common/Creature/Creature';
import { Property } from '@shared/common/Property/Property';
import { convertIdsParamToArray } from '@shared/utils/ids-converter';
import { DataSource } from 'typeorm';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

class AppDatabase {
    source: DataSource;

    constructor() {
        this.source = new DataSource({
            type: 'sqlite',
            synchronize: true,
            database: '_server/database.db',
            entities: [Property, Creature],
        });

        this.source
            .initialize()
            .then(() => {
                console.log('Data Source has been initialized!');
            })
            .catch((error: Error) => {
                console.error('Error during Data Source initialization', error);
            });
    }

    create = async (
        entityTarget: EntityTarget<ObjectLiteral>,
        data: QueryDeepPartialEntity<ObjectLiteral> | QueryDeepPartialEntity<ObjectLiteral>[],
    ) => {
        const repo = this.source.getRepository(entityTarget);
        const results = repo.create(data);
        return repo.insert(results);
    };

    save = async (entityTarget: EntityTarget<ObjectLiteral>, data: ObjectLiteral | ObjectLiteral[]) => {
        return await this.source.getRepository(entityTarget).save(data);
    };

    find = async (entityTarget: EntityTarget<ObjectLiteral>, id: string | string[]) => {
        const ids = convertIdsParamToArray(id);

        return await this.source
            .createQueryBuilder(entityTarget, 'property')
            .where('property.id IN (:...ids)', { ids })
            .getMany();
    };

    delete = async (entityTarget: EntityTarget<ObjectLiteral>, id: string | string[]) => {
        return await this.source.getRepository(entityTarget).delete(id);
    };
}

export const appDatabase = new AppDatabase();
