import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a favorite' })
  @ApiResponse({ status: 201, description: 'Favorite created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all favorites of a user' })
  @ApiResponse({ status: 200, description: 'Favorites found' })
  @ApiResponse({ status: 404, description: 'No favorites found' })
  async findAll(@Param('userId') userId: string) {
    return this.favoritesService.findAll(+userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one favorite' })
  @ApiResponse({ status: 200, description: 'Favorite found' })
  @ApiResponse({ status: 404, description: 'Favorite not found' })
  async findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a favorite' })
  @ApiResponse({ status: 200, description: 'Favorite updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoritesService.update(+id, updateFavoriteDto);
  }

  @Delete('user/:userId/guide/:guideId')
  @ApiOperation({ summary: 'Remove a favorite' })
  @ApiResponse({ status: 200, description: 'Favorite removed' })
  async remove(@Param('userId') userId: string, @Param('guideId') guideId: string) {
    return this.favoritesService.remove(+userId, +guideId);
  }
}
