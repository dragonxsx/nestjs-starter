import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import CreateCategoryDto from './dto/createCategory.dto';
import RequestWithUser from '../authentication/requestWithUser.interface';
import FindOneParams from '../utils/findOneParams';
import UpdateCategoryDto from './dto/updateCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createCategory(@Body() category: CreateCategoryDto, @Req() request: RequestWithUser) {
    return this.categoriesService.createCategory(category);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  async getCategoryById(@Param() {id}: FindOneParams) {
    return this.categoriesService.getCategoryById(Number(id));
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async deleteCategoryById(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(Number(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  async updateCategoryById(@Param('id') id: string, @Body() category: UpdateCategoryDto){
    return this.categoriesService.updateCategory(Number(id), category);
  }
}
