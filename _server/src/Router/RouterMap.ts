import { CreatureController } from '@server/Database/controllers/CreatureController';
import { buildRouterUrl } from '@shared/router/utils';

export const RouterMap = [
    {
        method: 'get',
        url: buildRouterUrl('creatures'),
        controller: CreatureController,
        action: 'all',
    },
    {
        method: 'get',
        url: buildRouterUrl('creatures', true),
        controller: CreatureController,
        action: 'list',
    },
    {
        method: 'post',
        url: buildRouterUrl('creatures'),
        controller: CreatureController,
        action: 'create',
    },
    {
        method: 'put',
        url: buildRouterUrl('creatures'),
        controller: CreatureController,
        action: 'save',
    },
    {
        method: 'delete',
        url: buildRouterUrl('creatures'),
        controller: CreatureController,
        action: 'remove',
    },
];
