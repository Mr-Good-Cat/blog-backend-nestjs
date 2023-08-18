import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PageService } from '../service/page.service';

@Controller('page')
@ApiTags('Page')
export class PageController {
  constructor(private readonly pageService: PageService) {}
}
