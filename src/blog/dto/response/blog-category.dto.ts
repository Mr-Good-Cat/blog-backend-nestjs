import { ApiProperty } from '@nestjs/swagger';

export class BlogCategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  seoTitle: string;

  @ApiProperty()
  seoDescription: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  url: string;
}
