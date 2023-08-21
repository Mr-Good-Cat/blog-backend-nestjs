import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
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
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'Order must be an integer number' })
  order: number;

  @ApiProperty({ enum: PageType })
  @IsEnum(PageType)
  @CanBeRootPage()
  @CanPageBeNestedPageRule()
  type: PageType;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  seoTitle: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  seoDescription: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'Slug should only contain letters in lower case, numbers and symbol "-"',
  })
  @IsUniqueUrl()
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @CanPageHasNestedPage()
  parentPageId: number;
}
