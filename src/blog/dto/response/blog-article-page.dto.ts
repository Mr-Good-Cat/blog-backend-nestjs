import { ApiProperty } from '@nestjs/swagger';
import { BlogBreadcrumbsDto } from './blog-breadcrumbs.dto';
import { Type } from 'class-transformer';

export class BlogArticlePageDto {
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

  @ApiProperty({ isArray: true })
  @Type(() => BlogBreadcrumbsDto)
  breadcrumbs: BlogBreadcrumbsDto[];
}
