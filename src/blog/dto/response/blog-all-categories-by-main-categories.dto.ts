import { Page } from '../../entity/page.entity';
import { BlogCategoryDto } from './blog-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BlogAllCategoriesByMainCategoriesDto {
  @ApiProperty()
  result: { [key in Page['slug']]: BlogCategoryDto[] };
}
