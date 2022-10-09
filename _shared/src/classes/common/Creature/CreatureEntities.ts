import { PropertyEntity } from '@generics/Property/PropertyEntities';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreatureType } from './CreatureTypes';

@Entity('creature')
export class CreatureEntity {
    @PrimaryGeneratedColumn('increment')
    id!: string;

    @Column({ type: 'text' })
    type!: CreatureType;

    @OneToMany(() => CreaturePropertyEntity, (property) => property.creature, {
        eager: true,
        cascade: true,
    })
    properties!: CreaturePropertyEntity[];
}

@Entity('creature_property')
export class CreaturePropertyEntity extends PropertyEntity {
    @ManyToOne(() => CreatureEntity, (creature) => creature.properties, {
        onDelete: 'CASCADE',
    })
    creature!: CreatureEntity;
}

export const creatureEntities = [CreatureEntity, CreaturePropertyEntity];
