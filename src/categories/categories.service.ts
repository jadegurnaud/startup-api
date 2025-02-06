import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) { }

    async create(createCategoryDto: any) {
        const category = this.categoriesRepository.create(createCategoryDto);
        return await this.categoriesRepository.save(category);
    } 

    async findOne(id: number) {
        return await this.categoriesRepository.findOneBy({ id });
       
      }

    async findAll() {
        return await this.categoriesRepository.find();
    }

}