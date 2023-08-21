import { Injectable } from '@nestjs/common';
import { Page } from '../entity/page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageType } from '../enum/page-type.enum';

@Injectable()
export class PageRepository {
  constructor(
    @InjectRepository(Page)
    private readonly repository: Repository<Page>,
  ) {}

  async createRoot(entity: Page): Promise<Page> {
    await this.repository.save(entity);

    return this.setPath('', entity);
  }

  async addChild(parent: Page, child: Page): Promise<Page> {
    await this.repository.save(child);

    return this.setPath(parent.path, child);
  }

  findById(id: Page['id']): Promise<Page | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  findBySlug(slug: Page['slug']): Promise<Page[]> {
    return this.repository.find({
      where: {
        slug,
      },
    });
  }

  findAllAncestors(path: Page['path']): Promise<Page[]> {
    return this.repository
      .createQueryBuilder()
      .where('path @> :path and path != :path', { path })
      .getMany();
  }

  findChildren(parentId: number, level: number): Promise<Page[]> {
    if (!Number.isInteger(parentId) || !Number.isInteger(level)) {
      return Promise.resolve([]);
    }

    return this.repository
      .createQueryBuilder('page')
      .where('path ~ :lquery', { lquery: `*.${parentId}.*{${level}}` })
      .orderBy({
        'page.order': 'ASC',
      })
      .getMany();
  }

  findMainCategoryList(): Promise<Page[]> {
    return this.repository.find({
      where: {
        type: PageType.MAIN_CATEGORY,
      },
      order: {
        order: 'ASC',
      },
    });
  }

  private async setPath(parentPath: Page['path'], page: Page): Promise<Page> {
    const parentIds = parentPath.split('.').filter((el) => !!el);

    page.path = [...parentIds, page.id].join('.');

    await this.repository.save(page);

    return page;
  }
}
