import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Variant } from '../../variant/entities/variant.entity';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  hexCode: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Variant, (variant) => variant.colors, { onDelete: 'CASCADE' })
  variant: Variant;
}
