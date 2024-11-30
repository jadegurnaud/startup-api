import { Guide } from "../../../guides/entities/guide.entity";
import { DataSource } from "typeorm";
import { guidesData } from "../data/guides.seed";
import { GuidesService } from "../../../guides/guides.service";
import { ImagesService } from "../../../images/images.service";
import * as path from 'path';
import * as fs from 'fs';

export class GuideSeeder {
    constructor(private readonly guidesService : GuidesService, private readonly imagesService : ImagesService) {}

    async seed() {
        for (const guideData of guidesData) {
            let uploadedCoverImage: {url: string, cloudinaryPublicId: string} | null = null;
            if (guideData.coverImage) {
                const coverImagePath = path.resolve(__dirname, guideData.coverImage);
                const coverImageFile = {
                  buffer: fs.readFileSync(coverImagePath),
                  originalname: path.basename(coverImagePath),
                } as Express.Multer.File;
                uploadedCoverImage = await this.imagesService.uploadImage(coverImageFile);
            }

            let uploadedImages: Array<{ url: string; cloudinaryPublicId: string }> = [];
            if (guideData.images && guideData.images.length > 0) {
                uploadedImages = await Promise.all(
                guideData.images.map(async (imagePath) => {
                    const imageFilePath = path.resolve(__dirname, imagePath);
                    const imageFile = {
                    buffer: fs.readFileSync(imageFilePath),
                    originalname: path.basename(imageFilePath),
                    } as Express.Multer.File;
                    return this.imagesService.uploadImage(imageFile);
                }),
                );
            }

            await this.guidesService.create({...guideData, coverImage: uploadedCoverImage ? uploadedCoverImage : null , images: uploadedImages});
        }
    }
}