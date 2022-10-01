import { Events } from '@shared/classes/generic/Events/Events';
import { Value, ValueNumber } from '@shared/classes/generic/Value/Value';
import { Column, Entity } from 'typeorm';

import { PropertyEntity } from './PropertyEntity';
import { PropertyType } from './PropertyTypes';

export class Property extends Value {
    private criticalPercentage: number = 10;

    constructor(public type: PropertyType, value: number | ValueNumber = 0, private events: Events) {
        super(value);
    }

    setEvents(events: Events) {
        this.events = events;
        return this;
    }

    override change(value: number): void {
        super.change(value);

        if (this.valuePercentage <= this.criticalPercentage)
            this.events.trigger(this.constructor.name, 'onCriticalChange', { property: this });
    }

    override getEntityData(): PropertyEntity {
        return {
            ...super.getEntityData(),
            type: this.type,
        };
    }
}
