import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { ImagesService } from '../images/images.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { url } from 'inspector';

@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService,
    private imagesService: ImagesService
  ) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'coverImage', maxCount: 1 }, { name: 'images', maxCount: 8 }]))
  async create(@Body() createGuideDto: CreateGuideDto, @UploadedFiles() files: {coverImage: Express.Multer.File, images: Express.Multer.File[]}) {
    let uploadedCoverImage: {url: string, cloudinaryPublicId: string} | null = null;
    if (files.coverImage) {
      uploadedCoverImage = await this.imagesService.uploadImage(files.coverImage[0]);
    }
    let uploadedImages: Array<{url: string, cloudinaryPublicId: string}> = [];
    if (files.images && files.images.length > 0) {
      uploadedImages = await Promise.all(files.images.map(image => this.imagesService.uploadImage(image)));
    }

    return this.guidesService.create({...createGuideDto, coverImage: uploadedCoverImage , images: uploadedImages});
  }

  @Get()
  async findAll() {
    return this.guidesService.findAll();
  }

  @Get('user/:userId')
  async findAllByUser(@Param('userId') userId: string) {
    return this.guidesService.findAllByUser(+userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.guidesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGuideDto: UpdateGuideDto) {
    return this.guidesService.update(+id, updateGuideDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.guidesService.remove(+id);
  }
}
