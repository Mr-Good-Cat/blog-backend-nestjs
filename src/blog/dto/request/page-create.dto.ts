import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Matches } from 'class-validator';
import { PageType } from '../../enum/page-type.enum';
import { CanPageHasNestedPage } from '../../validation-rule/can-page-has-nested-page.rule';
import { Transform } from 'class-transformer';
import { CanPageBeNestedPageRule } from '../../validation-rule/can-page-be-nested-page.rule';
import { CanBeRootPage } from '../../validation-rule/can-be-root-page.rule';
import { IsUniqueUrl } from '../../validation-rule/is-unique-url.rule';

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
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  order: number;

  @ApiProperty({ enum: PageType })
  @IsEnum(PageType)
  @CanBeRootPage()
  @CanPageBeNestedPageRule()
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
  @IsUniqueUrl()
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @CanPageHasNestedPage()
  parentPageId: number;
}
