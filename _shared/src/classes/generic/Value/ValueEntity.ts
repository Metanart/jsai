import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ValueEntity {
    @PrimaryColumn('blob')
    id!: string;

    @Column({ type: 'integer' })
    currentValue!: number;

    @Column({ type: 'integer' })
    currentMaxValue!: number;

    @Column({ type: 'integer' })
    currentMinValue!: number;

    @Column({ type: 'integer' })
    baseValue!: number;

    @Column({ type: 'integer' })
    baseMaxValue!: number;

    @Column({ type: 'integer' })
    baseMinValue!: number;
}
