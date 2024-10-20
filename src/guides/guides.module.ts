import { Module } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { GuidesController } from './guides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide } from './entities/guide.entity';
import { User } from 'src/users/entities/user.entity';
import { Image } from 'src/images/entites/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guide]),
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([Image])
],
  controllers: [GuidesController],
  providers: [GuidesService],
})
export class GuidesModule {}
