import { Injectable } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { EntityManager, Repository } from 'typeorm';
import { Guide } from './entities/guide.entity';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../images/entites/image.entity';
import { ImagesService } from '../images/images.service';

@Injectable()
export class GuidesService {
  constructor(
    @InjectRepository(Guide)
    private readonly guidesRepository: Repository<Guide>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly imagesService: ImagesService
  ) {}

  async create(createGuideDto: CreateGuideDto) {
    const { title, description, user, coverImage, images } = createGuideDto;
    
    const foundUser = await this.usersRepository.findOne({ where: { id: user } });
    if (!foundUser) {
      throw new Error('User not found');
    }

    const guide = new Guide({ title, description, coverImage: coverImage.url, user: foundUser });

    if (images && images.length > 0) {
      guide.images = images.map(image =>
        new Image({
          url: image.url,
          cloudinaryPublicId: image.cloudinaryPublicId,
          guide
        })
      );
    }
    await this.entityManager.save(guide);
  }

  async findAll() {
    return await this.guidesRepository.find( { relations: ['user', 'images', 'address'] });
  }

  async findAllByUser(userId: number) {
    return await this.guidesRepository.find({ where: { user: { id: userId } }, relations: ['images'] });
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
    //supprimer les images de cloudinary
    const guide = await this.findOne(id);
    if (!guide) {
      throw new Error('Guide not found');
    }
    if(guide.coverImage) {
      let cloudinaryPublicId = guide.coverImage.split('/').slice(-1)[0];
      cloudinaryPublicId = cloudinaryPublicId.split('.')[0];
      cloudinaryPublicId = `guides/${cloudinaryPublicId}`;
      await this.imagesService.deleteImage(cloudinaryPublicId);
    }
    if (!guide.images || guide.images.length === 0) {  
      const cloudinaryPublicIds = guide.images.map(image => image.cloudinaryPublicId);
      await this.imagesService.deleteImages(cloudinaryPublicIds);
    }
    await this.guidesRepository.delete({ id });
  }
}
