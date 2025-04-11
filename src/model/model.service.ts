import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs'; // Needed to convert Observable to Promise
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async create(createModelDto: CreateModelDto) {
    const model = this.modelRepository.create(createModelDto);
    return this.modelRepository.save(model);
  }

  async findAll() {
    return this.modelRepository.find();
  }

  async findOne(id: number) {
    return this.modelRepository.findOneBy({ id });
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    await this.modelRepository.update(id, updateModelDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.modelRepository.delete(id);
  }
}

