import { ApiProperty } from '@nestjs/swagger';
import { PageType } from '../../enum/page-type.enum';
import { PageStatus } from '../../enum/page-status.enum';

export class PageDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  order: number;

  @ApiProperty({ enum: PageType })
  type: PageType;

  @ApiProperty()
  seoTitle: string;

  @ApiProperty()
  seoDescription: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  path: string;

  @ApiProperty({ enum: PageStatus })
  status: PageStatus;

  @ApiProperty()
  createAt: Date;
}
