import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogService } from '../service/blog.service';
import { BlogMainCategoryDto } from '../dto/response/blog-main-category.dto';

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
}
