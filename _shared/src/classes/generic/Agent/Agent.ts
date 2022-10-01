import { Director } from '../Director/Director';
import { Entity } from '../Entity/Entity';

export class Agent extends Entity {
    constructor(public type: string, public director?: Director) {
        super();
    }

    setDirector(director: Director) {
        this.director = director;
    }
}
