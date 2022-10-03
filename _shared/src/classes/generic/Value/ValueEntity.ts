import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ValueEntity {
    @Column({ type: 'integer' })
    value!: number;

    @Column({ type: 'integer' })
    maxValue!: number;

    @Column({ type: 'integer' })
    minValue!: number;

    @Column({ type: 'integer' })
    baseValue!: number;

    @Column({ type: 'integer' })
    baseMaxValue!: number;

    @Column({ type: 'integer' })
    baseMinValue!: number;
}
