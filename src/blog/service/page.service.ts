import { Injectable } from '@nestjs/common';
import { PageRepository } from '../repository/page.repository';
import { PageDto } from '../dto/response/page.dto';
import { Page } from '../entity/page.entity';
import { PageCreateDto } from '../dto/request/page-create.dto';

@Injectable()
export class PageService {
  constructor(private readonly pageRepository: PageRepository) {}

  async create(createDto: PageCreateDto): Promise<PageDto> {
    const page = new Page();

    page.title = createDto.title;
    page.description = createDto.description;
    page.order = createDto.order;
    page.type = createDto.type;
    page.seoTitle = createDto.seoTitle;
    page.seoDescription = createDto.seoDescription;
    page.slug = createDto.slug;

    if (createDto.parentPageId) {
      const parent = await this.pageRepository.findById(createDto.parentPageId);

      await this.pageRepository.addChild(parent, page);
    } else {
      await this.pageRepository.createRoot(page);
    }

    return this.transformToPageDto(page);
  }

  private async transformToPageDto(entity: Page): Promise<PageDto> {
    return {
      id: entity.id,
      type: entity.type,
      path: entity.path,
      status: entity.status,
      seoTitle: entity.seoTitle,
      seoDescription: entity.seoDescription,
      slug: entity.slug,
      order: entity.order,
    };
  }
}
