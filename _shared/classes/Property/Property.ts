import { PropertyType } from '@classes/Property/PropertyTypes';
import { Value, ValueNumber } from '@classes/Value/Value';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Property extends Value {
    @Column({ type: 'text' })
    type: PropertyType;
    criticalPercentage: number = 20;

    constructor(type: PropertyType, value: number | ValueNumber) {
        super(value);
        this.type = type;
    }
}
