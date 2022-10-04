import { Events } from '@generic/Events/Events';
import { Value } from '@generic/Value/Value';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { PropertyType } from './PropertyTypes';

@Entity()
export class Property extends Value {
    @PrimaryColumn('blob')
    id: string;

    @Column({ type: 'text' })
    type: PropertyType;

    @Column('blob')
    parentId: string;

    criticalPercentage: number = 10;

    constructor(
        id: string,
        type: PropertyType,
        value: number,
        parentId: string,
        public events?: Events,
        maxValue?: number,
        minValue?: number,
        baseValue?: number,
        baseMaxValue?: number,
        baseMinValue?: number,
    ) {
        super(value, maxValue, minValue, baseValue, baseMaxValue, baseMinValue);

        this.id = id;
        this.parentId = parentId;
        this.type = type;
    }

    setEvents(events: Events) {
        this.events = events;
        return this;
    }

    override change(value: number): void {
        super.change(value);

        if (this.events && this.valuePercentage <= this.criticalPercentage)
            this.events.trigger(this.constructor.name, 'onCriticalChange', { property: this });
    }
}
