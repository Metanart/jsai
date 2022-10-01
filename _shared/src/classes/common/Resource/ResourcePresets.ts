import { ResourceType } from './ResourceTypes';
import { ResourcePreset } from './ResourceTypes';

export const mapResourceTypeToPreset: Record<ResourceType, ResourcePreset> = {
    ['bone']: [[3, 1], [['calories', 100]]],
    ['skull']: [[2, 2], [['calories', 100]]],
    ['meat']: [[2, 2], [['calories', 100]]],
    ['brain']: [
        [3, 4],
        [
            ['calories', 200],
            ['energy', 100],
        ],
    ],
    ['apple']: [[1, 1], [['calories', 50]]],
    ['cloth']: [[2, 2], [['calories', 100]]],
};
