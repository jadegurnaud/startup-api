import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { User } from 'src/users/entities/user.entity';
import { Guide } from 'src/guides/entities/guide.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]),
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([Guide])

  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
