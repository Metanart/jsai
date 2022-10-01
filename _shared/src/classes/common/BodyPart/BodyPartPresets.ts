import { BodyPartPreset, BodyPartType } from './BodyPartTypes';

export const mapBodyPartTypeToPreset: Record<BodyPartType, BodyPartPreset> = {
    ['head']: [[3, 4], [['health', 100]], ['bone', 'meat']],
    ['torso']: [[3, 4], [['health', 200]], ['bone', 'meat']],
    ['leftArm']: [[3, 4], [['health', 120]], ['bone', 'meat']],
    ['rightArm']: [[3, 4], [['health', 120]], ['bone', 'meat']],
    ['leftLeg']: [[3, 4], [['health', 150]], ['bone', 'meat']],
    ['rightLeg']: [[3, 4], [['health', 150]], ['bone', 'meat']],
};
