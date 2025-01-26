import { Module } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { GuidesController } from './guides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide } from './entities/guide.entity';
import { User } from '../users/entities/user.entity';
import { ImagesModule } from '../images/images.module';
import { Address } from './entities/adresse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guide]),
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([Address]),
  ImagesModule
],
  controllers: [GuidesController],
  providers: [GuidesService],
})
export class GuidesModule {}
