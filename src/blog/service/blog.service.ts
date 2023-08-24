import { Injectable } from '@nestjs/common';
import { PageRepository } from '../repository/page.repository';
import { UrlService } from './url.service';
import { Page } from '../entity/page.entity';
import { BlogMainCategoryDto } from '../dto/response/blog-main-category.dto';

@Injectable()
export class BlogService {
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly urlService: UrlService,
  ) {}

  async getMainCategory(): Promise<BlogMainCategoryDto[]> {
    const entityList = await this.pageRepository.findMainCategoryList();

    const request = entityList.map((e) => this.transformToBlogMainCategory(e));

    return Promise.all(request);
  }

  private async transformToBlogMainCategory(
    entity: Page,
  ): Promise<BlogMainCategoryDto> {
    const url = await this.urlService.to(entity);

    return {
      id: entity.id,
      title: entity.title,
      seoTitle: entity.seoTitle,
      seoDescription: entity.seoDescription,
      slug: entity.slug,
      url,
    };
  }
}
