import { UserSeeder } from './seeders/user.seeder';
import { GuideSeeder } from './seeders/guide.seeder';
import { UsersService } from '../../users/users.service';
import { DataSource } from 'typeorm';
import { GuidesService } from '../../guides/guides.service';
import { FavoritesService } from '../../favorites/favorites.service';
import { ImagesService } from '../../images/images.service';


export const runSeeds = async (dataSource: DataSource, usersService: UsersService, guidesService: GuidesService, favoritesService :FavoritesService, imagesService : ImagesService) => {
    await dataSource.manager.transaction(async (manager) => {
        try {
            const userSeeder = new UserSeeder(usersService);
            const guideSeeder = new GuideSeeder(guidesService, imagesService);

            await userSeeder.seed();
            await guideSeeder.seed();

            console.log('All seeds completed successfully');
        } catch (error) {
            console.error('Error during seeding:', error);
            throw error;
        }
    });
};