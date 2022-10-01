import { ClothingType } from './ClothingTypes';
import { ClothingPreset } from './ClothingTypes';

export const mapClothingTypeToPreset: Record<ClothingType, ClothingPreset> = {
    ['bodyJacket']: [[4, 5], ['cloth'], [['defence', 100]], [10, 10]],
    ['pants']: [[3, 6], ['cloth'], [['defence', 100]], [10, 10]],

    ['bodyShirt']: [[3, 4], ['cloth'], [['defence', 100]]],
    ['bodyVest']: [[3, 4], ['cloth'], [['defence', 100]]],
    ['feet']: [[3, 4], ['cloth'], [['defence', 100]]],
    ['eyewear']: [[3, 4], ['cloth'], [['defence', 100]]],
    ['gloves']: [[3, 4], ['cloth'], [['defence', 100]]],
    ['backpack']: [[3, 4], ['cloth'], [['defence', 100]]],
    ['headgear']: [[3, 4], ['cloth'], [['defence', 100]]],
    ['hips']: [[3, 4], ['cloth'], [['defence', 100]]],
};
