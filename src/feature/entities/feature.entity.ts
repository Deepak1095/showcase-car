import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Variant } from '../../variant/entities/variant.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  videoUrl: string;

  @ManyToOne(() => Variant, (variant) => variant.features, { onDelete: 'CASCADE' })
  variant: Variant;

  @ManyToOne(() => Category, (category) => category.features, { onDelete: 'SET NULL' })
  category: Category;
}

