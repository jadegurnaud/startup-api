import { Injectable } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { EntityManager, Repository } from 'typeorm';
import { Guide } from './entities/guide.entity';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/images/entites/image.entity';

@Injectable()
export class GuidesService {
  constructor(
    @InjectRepository(Guide)
    private readonly guidesRepository: Repository<Guide>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager
  ) {}

  async create(createGuideDto: CreateGuideDto) {
    const { title, description, user, coverImage, images } = createGuideDto;

    const foundUser = await this.usersRepository.findOne({ where: { id: user } });
    if (!foundUser) {
      throw new Error('User not found');
    }
    const guide = new Guide({ title, description, coverImage, user: foundUser });

    if (images) {
      guide.images = images.map(url => new Image({ url, guide }));
    }
    await this.entityManager.save(guide);
  }

  async findAll() {
    return await this.guidesRepository.find( { relations: ['user', 'images'] });
  }

  async findAllByUser(userId: number) {
    return await this.guidesRepository.find({ where: { user: { id: userId } }, relations: ['user', 'images'] });
  }

  async findOne(id: number) {
    return await this.guidesRepository.findOne({ where: { id } , relations: ['user', 'images'] });
  }

  async update(id: number, updateGuideDto: UpdateGuideDto) {
    const guide = await this.guidesRepository.findOneBy({ id });
    if (!guide) {
      throw new Error('Guide not found');
    }
    Object.assign(guide, updateGuideDto);
    await this.entityManager.save(guide);
  }

  async remove(id: number) {
    await this.guidesRepository.delete({ id });
  }
}
