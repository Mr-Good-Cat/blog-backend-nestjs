import { ApiProperty } from '@nestjs/swagger';

export class BlogBreadcrumbsDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  url: string;
}
