import { Module } from '@nestjs/common';
import { AccessoryService } from './accessory.service';
import { AccessoryController } from './accessory.controller';
import { Accessory } from './entities/accessory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [TypeOrmModule.forFeature([Accessory])], 
  controllers: [AccessoryController],
  providers: [AccessoryService],
})
export class AccessoryModule {}
