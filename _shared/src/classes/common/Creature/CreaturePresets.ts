import { CreatureType } from './CreatureTypes';
import { CreaturePreset } from './CreatureTypes';

export const mapCreatureTypeToPreset: Record<CreatureType, CreaturePreset> = {
    ['human']: {
        propertiesPresets: [
            { type: 'calories', value: 2000 },
            { type: 'defence', value: 2000 },
            { type: 'energy', value: 2000 },
        ],
    },
};
