import { CreatureEntity } from '@commons/Creature/CreatureEntities';

import { BaseController } from './BaseController';

class Controller extends BaseController<CreatureEntity> {}

export const CreatureController = new Controller(CreatureEntity);
