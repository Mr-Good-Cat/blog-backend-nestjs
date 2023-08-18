import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { PageType } from '../../enum/page-type.enum';

export class PageCreateDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  order: number;

  @ApiProperty({ enum: PageType })
  @IsEnum(PageType)
  type: PageType;

  @ApiProperty()
  @IsString()
  seoTitle: string;

  @ApiProperty()
  @IsString()
  seoDescription: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  parentPageId: number;
}
