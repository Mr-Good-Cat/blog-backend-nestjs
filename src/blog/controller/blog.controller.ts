import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogService } from '../service/blog.service';
import { BlogMainCategoryDto } from '../dto/response/blog-main-category.dto';
import { BlogArticleDto } from '../dto/response/blog-article.dto';
import { BlogAllCategoriesByMainCategoriesDto } from '../dto/response/blog-all-categories-by-main-categories.dto';

@Controller('blog')
@ApiTags('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('main-category')
  @ApiResponse({
    status: 200,
    description: 'Get list of main category',
    type: BlogMainCategoryDto,
    isArray: true,
  })
  mainCategory() {
    return this.blogService.getMainCategory();
  }

  @Get('new-articles/:mainCategorySlug')
  @ApiResponse({
    status: 200,
    description: 'Get last 3 articles in main category',
    type: BlogArticleDto,
    isArray: true,
  })
  newArticle(@Param('mainCategorySlug') mainCategorySlug: string) {
    return this.blogService.getNewArticle(mainCategorySlug);
  }

  @Get('all-categories')
  @ApiResponse({
    status: 200,
    description: 'Get list of all categoriest for all main categories',
    type: BlogAllCategoriesByMainCategoriesDto,
  })
  allCategories() {
    return this.blogService.getAllCategoriesByMainCategories();
  }
}
