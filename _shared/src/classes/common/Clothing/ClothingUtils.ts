import { Clothing } from './Clothing';
import { mapClothingTypeToPreset } from './ClothingPresets';
import { ClothingFactory, ClothingsFactory } from './ClothingTypes';

export const createClothing: ClothingFactory = (type, events) =>
    new Clothing(type, events, ...mapClothingTypeToPreset[type]);

export const createClothings: ClothingsFactory = (types, events) => types.map((type) => createClothing(type, events));
