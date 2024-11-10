import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Guide } from 'src/guides/entities/guide.entity';

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
    const { userId, guideId } = createFavoriteDto;
    
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const guide = await this.guidesRepository.findOne({ where: { id: guideId } });
    if (!guide) {
      throw new Error('Guide not found');
    }

    const favorite = new Favorite({ user, guide });
    await this.favoritesRepository.save(favorite);
  }

  async findAll(userId: number) {
    const favorites = await this.favoritesRepository.find({
      where: { user: { id: userId } },
      relations: ['guide', 'guide.user'],
     });
     return favorites.map(favorite => favorite.guide);
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
