import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Variant } from '../../variant/entities/variant.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Accessory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Variant, (variant) => variant.accessories, { onDelete: 'CASCADE' })
  variant: Variant;

  @ManyToOne(() => Category, (category) => category.accessories, { onDelete: 'SET NULL' })
  category: Category;
}
