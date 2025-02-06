import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Guide } from '../guides/entities/guide.entity';
import { GuideStatus } from 'src/guides/types/guide.types';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Guide)
    private readonly guidesRepository: Repository<Guide>,
  ) {}
  
  async create(createFavoriteDto: CreateFavoriteDto) {
    const { user, guide } = createFavoriteDto;
    
    const foundUser = await this.usersRepository.findOne({ where: { id: user } });
    if (!foundUser) {
      throw new Error('User not found');
    }

    const foundGuide = await this.guidesRepository.findOne({ where: { id: guide } });
    if (!guide) {
      throw new Error('Guide not found');
    }

    const favorite = new Favorite({ user: foundUser, guide: foundGuide });
    await this.favoritesRepository.save(favorite);
  }

  async findAll(userId: number) {
    const favorites = await this.favoritesRepository.find({
      where: { user: { id: userId } },
      relations: ['guide', 'guide.user'],
     });
     return favorites.filter(favorite => favorite.guide.status === GuideStatus.PUBLISHED).map(favorite => favorite.guide);
  }

  async findOne(id: number) {
    return await this.favoritesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    const favorite = await this.favoritesRepository.findOne({ where: { id } });
    if (!favorite) {
      throw new Error('Favorite not found');
    }
    Object.assign(favorite, updateFavoriteDto);
    await this.favoritesRepository.save(favorite);
  }

  async remove(userId: number, guideId: number) {
    await this.favoritesRepository.delete({ user: { id: userId }, guide: { id: guideId } });
  }
}
