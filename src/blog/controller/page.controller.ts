import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageService } from '../service/page.service';
import { PageDto } from '../dto/response/page.dto';
import { PageCreateDto } from '../dto/request/page-create.dto';
import { PageUpdateDto } from '../dto/request/page-update.dto';

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

  @Get('/:id/ancestors')
  @ApiResponse({
    status: 200,
    description: 'Get list of ancestors of page with id and the page itself',
    type: PageDto,
    isArray: true,
  })
  ancestors(@Param('id') id: number) {
    return this.pageService.ancestors(id);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get page by id',
    type: PageDto,
  })
  @ApiResponse({
    status: 400,
    description: 'If page does not exist',
  })
  getById(@Param('id') id: number) {
    const response = this.pageService.getById(id);
    if (!response) {
      throw new BadRequestException(`Not found page by id = ${id}`);
    }

    return response;
  }

  @Post('/update')
  @ApiResponse({
    status: 200,
    description: 'Update page',
    type: PageDto,
  })
  @ApiResponse({
    status: 400,
    description: 'If page does not exist',
  })
  update(@Body() updateDto: PageUpdateDto) {
    const response = this.pageService.getById(updateDto.id);
    if (!response) {
      throw new BadRequestException(`Not found page by id = ${updateDto.id}`);
    }

    return this.pageService.update(updateDto);
  }
}
