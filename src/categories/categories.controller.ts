import { CategoriesService } from "./categories.service";
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriessService: CategoriesService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get categories' })
  @ApiResponse({ status: 200, description: 'Categories found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async getCategories() {
    return this.categoriessService.findAll();
  }
}