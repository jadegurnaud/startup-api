import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../../app.module';
import { runSeeds } from './seed';
import { UsersService } from '../../users/users.service';
import { GuidesService } from '../../guides/guides.service';
import { FavoritesService } from '../../favorites/favorites.service';
import { ImagesService } from '../../images/images.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);
    const usersService = app.get(UsersService);
    const guidesService = app.get(GuidesService);
    const favoritesService = app.get(FavoritesService);
    const imagesService = app.get(ImagesService);

    
    try {
        await runSeeds(dataSource, usersService, guidesService, favoritesService, imagesService);
        console.log('Seeds executed successfully');
    } catch (error) {
        console.error('Error running seeds:', error);
    } finally {
        await app.close();
    }
}

bootstrap();