import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Accessory } from '../../accessory/entities/accessory.entity';
import { Feature } from '../../feature/entities/feature.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Accessory, (accessory) => accessory.category)
  accessories: Accessory[];

  @OneToMany(() => Feature, (feature) => feature.category)
  features: Feature[];
}

