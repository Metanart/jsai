import { creatureEntities } from '@commons/Creature/CreatureEntities';
import { Router } from '@server/Router/Router';
import { DataSource } from 'typeorm';

const createDatabase: () => Promise<DataSource> = async () => {
    const dataSource = new DataSource({
        type: 'sqlite',
        synchronize: true,
        database: '_server/src/Database/database.db',
        entities: [...creatureEntities],
        logging: true,
    });

    try {
        await dataSource.initialize();
        console.log('Data Source has been initialized!');
    } catch (error) {
        console.error('Error during Data Source initialization', error);
    }

    return dataSource;
};

export const connectDatabase = createDatabase();
