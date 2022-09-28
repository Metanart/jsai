import { Property } from '@classes/Property/Property';
import { database } from '@database';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { generateRoutes } from './utils';

const expressRouter = express();

expressRouter.use(bodyParser.json());
expressRouter.use(cors());

generateRoutes('properties', Property, expressRouter, database);

export const router = {
    start: () => expressRouter.listen(9090, () => console.log(`Server started at http://localhost:${9090}`)),
};
