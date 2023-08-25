import { ApiProperty } from '@nestjs/swagger';

export class BlogArticleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  seoTitle: string;

  @ApiProperty()
  seoDescription: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  url: string;
}
