import { entityId } from './EntityUtils';

export class Entity {
    id: number = entityId.getNextId();

    constructor() {
        this.id = Math.floor(Math.random() * 1000) + Date.now();
    }
}
