import { Entity } from 'typeorm';

@Entity()
export class CreatureEntity {
    id!: string;
    type!: string;
}
