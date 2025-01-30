import { UserSeeder } from './seeders/user.seeder';
import { GuideSeeder } from './seeders/guide.seeder';
import { UsersService } from '../../users/users.service';
import { DataSource } from 'typeorm';
import { GuidesService } from '../../guides/guides.service';
import { FavoritesService } from '../../favorites/favorites.service';
import { ImagesService } from '../../images/images.service';
import { AddressesService } from '../../addresses/addresses.service';
import { CategoriesService } from '../../categories/categories.service';
import { CategorySeeder } from './seeders/category.seeder';
import { AddressSeeder } from './seeders/address.seeder';


export const runSeeds = async (dataSource: DataSource, usersService: UsersService, guidesService: GuidesService, favoritesService :FavoritesService, imagesService : ImagesService, addressesService : AddressesService, categoriesService: CategoriesService) => {
    await dataSource.manager.transaction(async (manager) => {
        try {
            const userSeeder = new UserSeeder(usersService);
            const categorySeeder = new CategorySeeder(categoriesService);
            const addressSeeder = new AddressSeeder(addressesService);
            const guideSeeder = new GuideSeeder(guidesService, imagesService, addressesService);

            await userSeeder.seed();
            await categorySeeder.seed();
            await addressSeeder.seed();
            await guideSeeder.seed();

            console.log('All seeds completed successfully');
        } catch (error) {
            console.error('Error during seeding:', error);
            throw error;
        }
    });
};