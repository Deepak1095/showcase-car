// import { Injectable } from '@nestjs/common';
// import { CreateVariantDto } from './dto/create-variant.dto';
// import { UpdateVariantDto } from './dto/update-variant.dto';

// @Injectable()
// export class VariantService {
//   create(createVariantDto: CreateVariantDto) {
//     return 'This action adds a new variant';
//   }

//   findAll() {
//     return `This action returns all variant`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} variant`;
//   }

//   update(id: number, updateVariantDto: UpdateVariantDto) {
//     return `This action updates a #${id} variant`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} variant`;
//   }
// }



import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Variant } from './entities/variant.entity';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
  ) {}

  async create(createVariantDto: CreateVariantDto): Promise<Variant> {
    const variant = this.variantRepository.create(createVariantDto);
    return this.variantRepository.save(variant);
  }

  async findAll(): Promise<Variant[]> {
    return this.variantRepository.find({
      relations: ['model', 'colors', 'accessories', 'features'],
    });
  }

  // async findOne(id: number): Promise<Variant | null> {
  //   return this.variantRepository.findOne({
  //     where: { id },
  //     relations: ['model', 'colors', 'accessories',  'accessories.category',
  //       'features',
  //       'features.category',],
  //   });
  // }

  async findOne(id: number, category?: string): Promise<Variant> {
    const relations = [
      'model',
      'colors',
      'accessories',
      'accessories.category',
      'features',
      'features.category',
    ];
  
    const variant = await this.variantRepository.findOne({
      where: { id },
      relations,
    });
  
    if (!variant) throw new Error(`Variant with ID ${id} not found`);
  
    // If category filter is passed, filter accessories and features
    if (category) {
      variant.accessories = variant.accessories.filter(
        a => a.category?.name === category,
      );
      variant.features = variant.features.filter(
        f => f.category?.name === category,
      );
    }
  
    return variant;
  }
  

  async update(id: number, updateVariantDto: UpdateVariantDto): Promise<Variant | null> {
    await this.variantRepository.update(id, updateVariantDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.variantRepository.delete(id);
  }
}
