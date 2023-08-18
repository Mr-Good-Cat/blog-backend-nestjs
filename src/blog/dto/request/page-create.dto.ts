import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Matches } from 'class-validator';
import { PageType } from '../../enum/page-type.enum';
import { CanPageHasNestedPage } from '../../validation-rule/can-page-has-nested-page.rule';
import { Transform } from 'class-transformer';

export class PageCreateDto {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
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
  @Transform(({ value }) => value.trim())
  seoTitle: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  seoDescription: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug should only contain letters, nubers and symbol "-"',
  })
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @CanPageHasNestedPage()
  parentPageId: number;
}
