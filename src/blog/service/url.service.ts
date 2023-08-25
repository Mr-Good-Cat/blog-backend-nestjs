import { Injectable } from '@nestjs/common';
import { PageRepository } from '../repository/page.repository';
import { Page } from '../entity/page.entity';
import { PageType } from '../enum/page-type.enum';

@Injectable()
export class UrlService {
  constructor(private readonly pageRepository: PageRepository) {}

  async to(page: Page): Promise<string> {
    if (page.type === PageType.MAIN_CATEGORY) {
      return `/${page.slug}`;
    }

    const ancestors = await this.pageRepository.findAllAncestors(page.path);
    const mainCategory = ancestors[0];

    if (page.type === PageType.CATEGORY) {
      return this.toCategory(mainCategory.slug, page.slug);
    }

    const prevCategory = ancestors[ancestors.length - 1];

    return `/${mainCategory.slug}/${prevCategory.slug}/${page.slug}`;
  }

  toCategory(
    mainCategorySlug: Page['slug'],
    categorySlug: Page['slug'],
  ): string {
    return `/${mainCategorySlug}/${categorySlug}`;
  }
}
