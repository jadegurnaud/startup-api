import { Module } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { GuidesController } from './guides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide } from './entities/guide.entity';
import { User } from '../users/entities/user.entity';
import { ImagesModule } from '../images/images.module';
import { Address } from '../addresses/entities/address.entity';
import { Category } from '../categories/entities/category.entity';
import { DirectGuide } from './entities/direct-guide.entity';
import { ItineraryGuide } from './entities/itinerary-guide.entity';
import { Day } from './entities/day.entity';
import { Section } from './entities/section.entity';
import { ContentBlock } from './entities/content-block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guide]),
  TypeOrmModule.forFeature([User, Address, Category, DirectGuide, ItineraryGuide, Day, Section, ContentBlock]),
  ImagesModule
],
  controllers: [GuidesController],
  providers: [GuidesService],
})
export class GuidesModule {}
