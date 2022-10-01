import { EventsData, EventsTarget } from '@classes/generic/Events/EventsTypes';
import { Property } from '@classes/generic/Property/Property';

export class PlannerGoal {
    target?: EventsTarget;
    property: Property;

    constructor(eventData: EventsData) {
        if (eventData.target) this.target = eventData.target;
        this.property = eventData.property;
    }
}
