import { Guide } from "../../../guides/entities/guide.entity";
import { DataSource } from "typeorm";
import { guidesData } from "../data/guides.seed";
import { GuidesService } from "../../../guides/guides.service";

export class GuideSeeder {
    constructor(private readonly guidesService : GuidesService) {}

    async seed() {
        for (const guideData of guidesData) {
            await this.guidesService.create(guideData);
        }
    }
}