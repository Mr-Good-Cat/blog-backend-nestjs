import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageService } from '../service/page.service';
import { PageDto } from '../dto/response/page.dto';
import { PageCreateDto } from '../dto/request/page-create.dto';

@Controller('page')
@ApiTags('Page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post('create')
  @ApiResponse({
    status: 200,
    description: 'Create page',
    type: PageDto,
  })
  create(@Body() createDto: PageCreateDto): Promise<PageDto> {
    return this.pageService.create(createDto);
  }
}
