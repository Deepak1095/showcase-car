import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Model])], // ✅ This registers the repository
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
