import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { ImagesService } from '../images/images.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { url } from 'inspector';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('guides')
@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService,
    private imagesService: ImagesService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a guide' })
  @ApiResponse({ status: 201, description: 'Guide created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
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

    return this.guidesService.createDirectGuide({...createGuideDto, coverImage: uploadedCoverImage , images: uploadedImages});
  }

  /*@Get()
  async findAll() {
    return this.guidesService.findAll();
  }*/

  @Get('ajoutsRecents')
  @ApiOperation({ summary: 'Get the most recent guides' })
  @ApiResponse({ status: 200, description: 'Guides found' })
  @ApiResponse({ status: 404, description: 'No guides found' })
  async findAjoutsRecents() {
    return this.guidesService.findAjoutsRecents();
  }

  @Get('abonnements')
  @ApiOperation({ summary: 'Get the guides followed by the user' })
  @ApiResponse({ status: 200, description: 'Guides found' })
  @ApiResponse({ status: 404, description: 'No guides found' })
  async findAbonnements() {
    return this.guidesService.findAbonnements();
  }

  @Get('plusAimes')
  @ApiOperation({ summary: 'Get the most liked guides' })
  @ApiResponse({ status: 200, description: 'Guides found' })
  @ApiResponse({ status: 404, description: 'No guides found' })
  async findPlusAimes() {
    return this.guidesService.findPlusAimes();
  }

  @Get('plusConsultes')
  @ApiOperation({ summary: 'Get the most viewed guides' })
  @ApiResponse({ status: 200, description: 'Guides found' })
  @ApiResponse({ status: 404, description: 'No guides found' })
  async findPlusConsultes() {
    return this.guidesService.findPlusConsultes();
  }

  @Post('search')
  @ApiOperation({ summary: 'Search for guides' })
  @ApiResponse({ status: 200, description: 'Guides found' })
  @ApiResponse({ status: 404, description: 'No guides found' })
  async findRecherche(@Body() search: { type: string; country?: string; city?: string }) {
    return this.guidesService.findRecherche(search);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all guides from a user' })
  @ApiResponse({ status: 200, description: 'Guides found' })
  @ApiResponse({ status: 404, description: 'No guides found' })
  async findAllByUser(@Param('userId') userId: string) {
    return this.guidesService.findAllByUser(+userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one guide' })
  @ApiResponse({ status: 200, description: 'Guide found' })
  @ApiResponse({ status: 404, description: 'Guide not found' })
  async findOne(@Param('id') id: string) {
    return this.guidesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a guide' })
  @ApiResponse({ status: 200, description: 'Guide updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async update(@Param('id') id: string, @Body() updateGuideDto: UpdateGuideDto) {
    return this.guidesService.update(+id, updateGuideDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a guide' })
  @ApiResponse({ status: 200, description: 'Guide deleted' })
  @ApiResponse({ status: 404, description: 'Guide not found' })
  async remove(@Param('id') id: string) {
    return this.guidesService.remove(+id);
  }
}
