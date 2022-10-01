import { CreatureType } from './CreatureTypes';
import { CreaturePreset } from './CreatureTypes';

export const mapCreatureTypeToPreset: Record<CreatureType, CreaturePreset> = {
    ['human']: [
        [
            ['calories', [1000, 2000]],
            ['fatigue', [1000, 2000]],
        ],
        ['head', 'torso', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'],
    ],
};
