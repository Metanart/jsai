import { Property } from '@classes/Property/Property';
import { DataSource } from 'typeorm';

export const database: DataSource = new DataSource({
    type: 'sqlite',
    synchronize: true,
    database: './database.db',
    entities: [Property],
});

database
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((error: Error) => {
        console.error('Error during Data Source initialization', error);
    });
