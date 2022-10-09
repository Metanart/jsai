import { createCreatureFromPreset } from '@commons/Creature/CreatureUtils';
import { RestAPI } from '@restApi';
import { extractEntities } from '@shared/utils/extract-entities';

(async function () {
    const restApi = new RestAPI('creatures');

    const creatures = [createCreatureFromPreset('human').toEntity(), createCreatureFromPreset('human').toEntity()];

    const created = await restApi.POST(creatures);

    const removed = await restApi.DELETE(created);

    console.log(removed);
})();
