import { routerConfig } from '@shared/router/config';
import { convertIdsStringToArray } from '@shared/utils/ids-converter';
import bodyParser from 'body-parser';
import cors from 'cors';
import Express, { NextFunction, Request, Response } from 'express';

import { RouterMap } from './RouterMap';

export const createRouter = () => {
    const express = Express();

    express.use(cors());
    express.use(bodyParser.json());

    RouterMap.forEach((route) => {
        (express as any)[route.method](route.url, (request: Request, response: Response, next: NextFunction) => {
            const actionParams = route.method === 'get' ? convertIdsStringToArray(request.params.id) : request.body;
            const getResult = async () => await (route.controller as any)[route.action](actionParams);

            getResult().then((data) =>
                data !== null && data !== undefined ? response.send(data) : response.status(404).send(),
            );
        });
    });

    express.listen(routerConfig.port, () => console.log(`Server started at ${routerConfig.url}`));
};
