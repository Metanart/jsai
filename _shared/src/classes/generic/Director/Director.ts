import { Agent } from '../Agent/Agent';
import { Events } from '../Events/Events';
import { DirectorType } from './DirectorTypes';

export class Director extends Agent {
    constructor(type: DirectorType, director?: Director) {
        super(type, type, new Events(), director);
    }
}
