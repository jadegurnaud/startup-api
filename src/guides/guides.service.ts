import { Injectable } from '@nestjs/common';
import { CreateGuideDto, CreateDirectGuideDto, CreateItineraryGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { EntityManager, Repository, In } from 'typeorm';
import { Guide } from './entities/guide.entity';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../images/entites/image.entity';
import { ImagesService } from '../images/images.service';
import { DirectGuide } from './entities/direct-guide.entity';
import { Address } from '../addresses/entities/address.entity';
import { Category } from '../categories/entities/category.entity';
import { ItineraryGuide } from './entities/itinerary-guide.entity';
import { Day } from './entities/day.entity';
import { Section } from './entities/section.entity';
import { ContentBlock } from './entities/content-block.entity';
import { GuideStatus } from './types/guide.types';

@Injectable()
export class GuidesService {
  constructor(
    @InjectRepository(Guide)
    private readonly guidesRepository: Repository<Guide>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly imagesService: ImagesService,
    @InjectRepository(Address)
    private readonly addressesRepository: Repository<Address>,
  ) {}

  async createDirectGuide(createGuideDto: CreateDirectGuideDto,) {
    const { title, description, user, coverImage, images, address, categories } = createGuideDto;
    
    const foundUser = await this.usersRepository.findOne({ where: { id: user } });
    if (!foundUser) {
      throw new Error('User not found');
    }

    const foundAddress = await this.addressesRepository.findOne({ where: { id: address } });
    if (!foundAddress) {
      throw new Error('Address not found');
    }

    const foundCategories = await this.entityManager.find(Category, {
        where: categories.map(id => ({ id }))
    });

    if (foundCategories.length !== categories.length) {
        throw new Error('Some categories were not found');
    }

    const guide = new DirectGuide({ title, description, coverImage: coverImage.url, user: foundUser, address: foundAddress, categories: foundCategories });

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

  async createItineraryGuide(createGuideDto: CreateItineraryGuideDto) {
    const { title, description, user, coverImage, images, address, categories, startDate, endDate, startCity, days } = createGuideDto;

    const foundUser = await this.usersRepository.findOne({ where: { id: user } });
    if (!foundUser) {
      throw new Error('User not found');
    }

    const foundAddress = await this.addressesRepository.findOne({ where: { id: address } });
    if (!foundAddress) {
      throw new Error('Address not found');
    }

    const foundCategories = await this.entityManager.find(Category, {
        where: categories.map(id => ({ id }))
    });

    if (foundCategories.length !== categories.length) {
        throw new Error('Some categories were not found');
    }

    const guide = new ItineraryGuide({ title, description, coverImage: coverImage.url, user: foundUser, address: foundAddress, categories: foundCategories, startDate, endDate, startCity });

    if (images && images.length > 0) {
      guide.images = images.map(image =>
        new Image({
          url: image.url,
          cloudinaryPublicId: image.cloudinaryPublicId,
          guide
        })
      );
    }

    if (days && days.length > 0) {
      guide.days = days.map(dayData => {
        const day = new Day();
        day.date = dayData.date;
        day.description = dayData.description;
        day.itineraryGuide = guide;

        dayData.sections = dayData.sections.map(sectionData => {
          const section = new Section();
            section.sectionType = sectionData.sectionType;
          section.title = sectionData.title;
          section.description = sectionData.description;
          section.day = day;

          section.contentBlocks = sectionData.contentBlocks.map(content => {
            const block = new ContentBlock();
            block.contentType = content.contentType;
            block.content = content.content;
            block.section = section;
            return block;
          });
          return section;
        });
        return day;
      });
    }

    await this.entityManager.save(guide);
  }

  async findAll() {
    return await this.guidesRepository.find( { relations: ['user', 'images', 'address'] });
  }

  async findGuidesPubliesByUser(userId: number) {
    return await this.guidesRepository.find({ where: { user: { id: userId }, status: GuideStatus.PUBLISHED }, relations: ['images'] });
  }

  async findGuidesBrouillonsByUser(userId: number) {
    return await this.guidesRepository.find({ where: { user: { id: userId }, status: GuideStatus.DRAFT }, relations: ['images'] });
  }

  async findAllByUser(userId: number) {
    return await this.guidesRepository.find({ where: { user: { id: userId } }, relations: ['images'] });
  }

  async findOne(id: number) {
    return await this.guidesRepository.findOne({ where: { id } , relations: ['user', 'images'] });
  }

  async findByCategory(categoryId: number) { 
    return await this.guidesRepository
      .createQueryBuilder('guide')
      .leftJoinAndSelect('guide.categories', 'category') // Charge toutes les catégories
      .leftJoinAndSelect('guide.user', 'user')
      .leftJoinAndSelect('guide.images', 'images')
      .leftJoinAndSelect('guide.address', 'address')
      .where('guide.status = :status', { status: GuideStatus.PUBLISHED })
      .andWhere('guide.id IN ' +
        '(SELECT "guideId" FROM guide_categories_category WHERE "categoryId" = :categoryId)', 
        { categoryId })
      .getMany();
  }

  async findAjoutsRecents() {
    return await this.guidesRepository.find({
      where: { status: GuideStatus.PUBLISHED },
      order: { createdAt: 'DESC' },
      take: 50,
      relations: ['user', 'images', 'address'],
    });
  }

  async findAbonnements(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['following'] });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.following || !Array.isArray(user.following)) {
      return []; // Retourne un tableau vide si aucun abonnement
    }
    const followingIds = user.following.map(followingUser => followingUser.id);

    return await this.guidesRepository.find({
      where: { user: { id: In(followingIds) }, status: GuideStatus.PUBLISHED },
      order: { createdAt: 'DESC' },
      take: 50,
      relations: ['user', 'images', 'address'],
    });
  }

  async findPlusAimes() {
    return await this.guidesRepository.find({
      where: { status: GuideStatus.PUBLISHED },
      order: { createdAt: 'DESC' },
      take: 50,
      relations: ['user', 'images', 'address'],
    });
  }

  async findPlusConsultes() {
    return await this.guidesRepository.find({
      where: { status: GuideStatus.PUBLISHED },
      order: { views: 'DESC' },
      take: 50,
      relations: ['user', 'images', 'address'],
    });
  }

  async incrementConsultations(id: number) {
    await this.guidesRepository.increment({ id }, 'views', 1);
  }

  async findRecherche(search: { type: string; country?: string; city?: string }) {
    const queryBuilder = this.guidesRepository.createQueryBuilder('guide')
      .leftJoinAndSelect('guide.address', 'address')
      .leftJoinAndSelect('guide.user', 'user')
      .leftJoinAndSelect('guide.images', 'images');

    if (search.type === 'country' && search.country) {
      queryBuilder.where('address.country = :country', { country: search.country });
    } else if (search.type === 'city' && search.city && search.country) {
      queryBuilder.where('address.city = :city AND address.country = :country', { city: search.city, country: search.country });
    } else {
      throw new Error('Invalid search parameters');
    }
    let res = await queryBuilder.getMany();
    return res;
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
