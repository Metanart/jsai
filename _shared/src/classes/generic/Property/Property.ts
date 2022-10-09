import { Events } from '@generics/Events/Events';
import { Value } from '@generics/Value/Value';
import { getPreparedEntity } from '@shared/utils/get-prepared-entity';

import { PropertyEntity } from './PropertyEntities';
import { PropertyType } from './PropertyTypes';

export class Property extends Value {
    criticalPercentage: number = 10;

    constructor(
        public id: string,
        public type: PropertyType,
        public value: number,
        public events?: Events,
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

    change(value: number): void {
        super.change(value);

        if (this.events && this.valuePercentage <= this.criticalPercentage)
            this.events.trigger(this.constructor.name, 'onCriticalChange', { property: this });
    }

    toEntity() {
        return getPreparedEntity(this.id, {
            type: this.type,
            value: this.value,
            maxValue: this.maxValue,
            minValue: this.minValue,
            baseValue: this.baseValue,
            baseMaxValue: this.baseMaxValue,
            baseMinValue: this.baseMinValue,
        }) as PropertyEntity;
    }
}
