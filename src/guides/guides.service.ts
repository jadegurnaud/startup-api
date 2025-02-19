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
import { Stay } from './entities/stay.entity';
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
    const { title, description, user, coverImage, address, categories, price, views, status, isTravel } = createGuideDto;
    console.log(createGuideDto);
    const foundUser = await this.usersRepository.findOne({ where: { id: user } });
    if (!foundUser) {
      throw new Error('User not found');
    }

    const newAddress = this.addressesRepository.create(address);
    const savedAddress = await this.addressesRepository.save(newAddress);

    const foundCategories = await this.entityManager.find(Category, {
        where: categories.map(id => ({ id }))
    });

    if (foundCategories.length !== categories.length) {
        throw new Error('Some categories were not found');
    }

    const guide = new DirectGuide({ title, description, coverImage: coverImage?.url, user: foundUser, address: savedAddress, categories: foundCategories, price, views, status, isTravel });

    await this.entityManager.save(guide);
  }

  async createItineraryGuide(createGuideDto: CreateItineraryGuideDto) {
    const { title, description, user, coverImage, address, categories, startDate, endDate, startCity, endCity, days, stays, price, views, status, isTravel } = createGuideDto;
   console.log(createGuideDto);
    const foundUser = await this.usersRepository.findOne({ where: { id: user } });
    if (!foundUser) {
      throw new Error('User not found');
    }
    
    const newAddress = this.addressesRepository.create(address);
    const savedAddress = await this.addressesRepository.save(newAddress);


    const foundCategories = await this.entityManager.find(Category, {
        where: categories.map(id => ({ id }))
    });

    if (foundCategories.length !== categories.length) {
        throw new Error('Some categories were not found');
    }

    const guide = new ItineraryGuide({ title, description, coverImage: coverImage?.url, user: foundUser, address: savedAddress, categories: foundCategories, startDate, endDate, startCity, endCity, price, views, status, isTravel });
console.log(guide);
   

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
    if (stays && stays.length > 0) {
      guide.stays = stays.map(stayData => {
        const stay = new Stay();
        stay.startDate = stayData.startDate;
        stay.endDate = stayData.endDate;
        stay.description = stayData.description;
        stay.order = stayData.order;
        stay.address = this.addressesRepository.create(stayData.address);
        stay.days = stayData.days.map(dayData => {
          const day = new Day();
          day.date = dayData.date;
          day.description = dayData.description;
          day.itineraryGuide = guide;

          day.sections = dayData.sections.map(sectionData => {
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
        return stay;
      });
    }
    console.log(guide);
    await this.entityManager.save(guide);
  }

  async findAll() {
    return await this.guidesRepository.find( { relations: ['user', 'images', 'address'] });
  }

  async findGuidesPubliesByUser(userId: number) {
    return await this.guidesRepository.find({ where: { user: { id: userId }, status: GuideStatus.PUBLISHED, isTravel:false }, relations: ['images'] });
  }

  async findGuidesBrouillonsByUser(userId: number) {
    return await this.guidesRepository.find({ where: { user: { id: userId }, status: GuideStatus.DRAFT, isTravel:false }, relations: ['images'] });
  }

  async findTravelsByUser(userId: number) {
    return await this.guidesRepository.find({ where: { user: { id: userId }, status: GuideStatus.DRAFT, isTravel:true }, relations: ['images'] });
  }

  async findAllByUser(userId: number) {
    return await this.guidesRepository.find({ where: { user: { id: userId }, isTravel:false }, relations: ['images'] });
  }

  async findOne(id: number) {
    const guide = await this.guidesRepository.createQueryBuilder('guide')
      .leftJoinAndSelect('guide.user', 'user')
      .leftJoinAndSelect('guide.images', 'images')
      .leftJoinAndSelect('guide.categories', 'categories')
      .leftJoinAndSelect('guide.stays', 'stays')
      .leftJoinAndSelect('stays.address', 'address')
      .leftJoinAndSelect('stays.departingTransports', 'departingTransports')
      .leftJoinAndSelect('stays.arrivingTransports', 'arrivingTransports')
      .leftJoinAndSelect('stays.days', 'days')
      .leftJoinAndSelect('days.sections', 'sections')
      .where('guide.id = :id', { id })
      .orderBy('stays.order', 'ASC')
      .addOrderBy('days.date', 'ASC')
      .addOrderBy('sections.order', 'ASC')
      .getOne();

    if (!guide) {
      throw new Error('Guide not found');
    }

    return guide;
  }

  async findByCategory(categoryId: number) { 
    return await this.guidesRepository
      .createQueryBuilder('guide')
      .leftJoinAndSelect('guide.categories', 'category') // Charge toutes les catégories
      .leftJoinAndSelect('guide.user', 'user')
      .leftJoinAndSelect('guide.images', 'images')
      .leftJoinAndSelect('guide.address', 'address')
      .where('guide.status = :status', { status: GuideStatus.PUBLISHED })
      .andWhere('guide.isTravel = false')
      .andWhere('guide.id IN ' +
        '(SELECT "guideId" FROM guide_categories_category WHERE "categoryId" = :categoryId)', 
        { categoryId })
      .getMany();
  }

  async findAjoutsRecents() {
    return await this.guidesRepository.find({
      where: { status: GuideStatus.PUBLISHED, isTravel:false },
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
      where: { user: { id: In(followingIds) }, status: GuideStatus.PUBLISHED, isTravel:false},
      order: { createdAt: 'DESC' },
      take: 50,
      relations: ['user', 'images', 'address'],
    });
  }

  async findPlusAimes() {
    return await this.guidesRepository.find({
      where: { status: GuideStatus.PUBLISHED, isTravel:false },
      order: { createdAt: 'DESC' },
      take: 50,
      relations: ['user', 'images', 'address'],
    });
  }

  async findPlusConsultes() {
    return await this.guidesRepository.find({
      where: { status: GuideStatus.PUBLISHED, isTravel:false },
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
      .leftJoinAndSelect('guide.images', 'images')
      .where('guide.status = :status', { status: GuideStatus.PUBLISHED });

    if (search.type === 'country' && search.country) {
      queryBuilder.andWhere('address.country = :country', { country: search.country });
    } else if (search.type === 'city' && search.city && search.country) {
      queryBuilder.andWhere('address.city = :city AND address.country = :country', { city: search.city, country: search.country });
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
