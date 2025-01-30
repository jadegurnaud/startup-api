import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../../app.module';
import { runSeeds } from './seed';
import { UsersService } from '../../users/users.service';
import { GuidesService } from '../../guides/guides.service';
import { FavoritesService } from '../../favorites/favorites.service';
import { ImagesService } from '../../images/images.service';
import { AddressesService } from '../../addresses/addresses.service';
import { CategoriesService } from '../../categories/categories.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);
    const usersService = app.get(UsersService);
    const guidesService = app.get(GuidesService);
    const favoritesService = app.get(FavoritesService);
    const imagesService = app.get(ImagesService);
    const addressesService = app.get(AddressesService);
    const categoriesService = app.get(CategoriesService);

    
    try {
        await runSeeds(dataSource, usersService, guidesService, favoritesService, imagesService, addressesService, categoriesService);
        console.log('Seeds executed successfully');
    } catch (error) {
        console.error('Error running seeds:', error);
    } finally {
        await app.close();
    }
}

bootstrap();