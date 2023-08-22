import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsUniqueUrl } from '../../validation-rule/is-unique-url.rule';
import { PageStatus } from '../../enum/page-status.enum';
import { IsExistPage } from '../../validation-rule/is-exist-page.rule';

export class PageUpdateDto {
  @ApiProperty()
  @IsPositive()
  @IsExistPage()
  id: number;

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
  @IsInt({ message: 'Order must be an integer number' })
  order: number;

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

  @ApiProperty({ enum: PageStatus })
  @IsEnum(PageStatus)
  status: PageStatus;
}
