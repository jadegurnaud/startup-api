import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';

@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Post()
  async create(@Body() createGuideDto: CreateGuideDto) {
    return this.guidesService.create(createGuideDto);
  }

  @Get()
  async findAll() {
    return this.guidesService.findAll();
  }

  @Get(':userId')
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
