import { Controller, Get } from '@nestjs/common';
import { ModelService } from './model.service';

@Controller('models') // <- THIS sets the base route
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get() // <- This maps to GET /models
  findAll() {
    return this.modelService.findAll(); // This should return something
  }
}
