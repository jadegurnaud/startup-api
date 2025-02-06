import { CategoriesService } from "src/categories/categories.service";
import { categoriesData } from "../data/categories.seed";

export class CategorySeeder {
    constructor(private readonly categoriesService: CategoriesService) {}

    async seed() {

        for (const categorieData of categoriesData) {
            await this.categoriesService.create(categorieData);
        }
    }
}