import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @Get('list')
  @ApiQuery({
    name: 'parentPageId',
    type: Number,
    description:
      'If you want get children some page. You need send "id" this page in parentPageId params',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description:
      'Get list of main categories or list of pages that belong page with id = parentPageId sorted by order field',
    type: PageDto,
    isArray: true,
  })
  list(@Query('parentPageId') parentPageId?: number) {
    return this.pageService.list(parentPageId);
  }
}
