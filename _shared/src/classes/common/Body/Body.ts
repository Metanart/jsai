import { Structure } from '@classes/generic/Structure/Structure';

import { BodyPart } from '../BodyPart/BodyPart';
import { BodyPartType } from '../BodyPart/BodyPartTypes';
import { createBodyParts } from '../BodyPart/BoryPartUtils';

export class Body extends Structure<BodyPartType, BodyPart> {
    constructor(public partsTypes: BodyPartType[]) {
        super('BodyPart', partsTypes);
        this.setItems(createBodyParts(partsTypes));
    }
}
