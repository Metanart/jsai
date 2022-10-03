import { Events } from '@shared/classes/generic/Events/Events';
import { Value } from '@shared/classes/generic/Value/Value';
import { CollectedEntity } from '@shared/types';

import { PropertyType } from './PropertyTypes';

export class Property extends Value {
    private criticalPercentage: number = 10;

    constructor(
        public id: string,
        public parentId: string,
        public type: PropertyType,
        private events: Events,
        value: number,
        maxValue?: number,
        minValue?: number,
        baseValue?: number,
        baseMaxValue?: number,
        baseMinValue?: number,
    ) {
        super(value, maxValue, minValue, baseValue, baseMaxValue, baseMinValue);
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

    override getEntity(): CollectedEntity {
        return {
            name: this.constructor.name,
            data: {
                id: this.id,
                parentId: this.parentId,
                type: this.type,
                ...super.getEntity().data,
            },
        };
    }
}
