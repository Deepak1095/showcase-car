import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Model } from '../../model/entities/model.entity';
import { Color } from '../../color/entities/color.entity';
import { Accessory } from '../../accessory/entities/accessory.entity';
import { Feature } from '../../feature/entities/feature.entity';

@Entity()
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => Model, (model) => model.variants, { onDelete: 'CASCADE' })
  model: Model;

  @OneToMany(() => Color, (color) => color.variant)
  colors: Color[];

  @OneToMany(() => Accessory, (accessory) => accessory.variant)
  accessories: Accessory[];
  
  @OneToMany(() => Feature, (feature) => feature.variant)
  features: Feature[];



  // Accessory and Feature relations will be added later
}

