import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Image } from "./entites/image.entity";
import { v2 as cloudinary } from "cloudinary";

interface CloudinaryUploadResult {
    url: string;
    cloudinaryPublicId: string;
  }

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>
  ) {}

    async uploadImage(file: Express.Multer.File): Promise<CloudinaryUploadResult> {
        try {
            const result = await new Promise<any>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'guides',
                        use_filename: true,
                        unique_filename: true,
                    },
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                        resolve(result);
                    }
                ).end(file.buffer);
            });

            return {
                url: result.secure_url,
                cloudinaryPublicId: result.public_id,
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteImage(cloudinaryPublicId: string) {
        try {
            await cloudinary.uploader.destroy(cloudinaryPublicId);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteImages(cloudinaryPublicIds: string[]) {
        try {
            await Promise.all(cloudinaryPublicIds.map(cloudinaryPublicId => this.deleteImage(cloudinaryPublicId)));
        } catch (error) {
            throw new Error(error);
        }
    }

}