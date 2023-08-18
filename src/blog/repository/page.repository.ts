import { Injectable } from '@nestjs/common';
import { Page } from '../entity/page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  private async setPath(parentPath: Page['path'], page: Page): Promise<Page> {
    const parentIds = parentPath.split('.').filter((el) => !!el);

    page.path = [...parentIds, page.id].join('.');

    await this.repository.save(page);

    return page;
  }
}
