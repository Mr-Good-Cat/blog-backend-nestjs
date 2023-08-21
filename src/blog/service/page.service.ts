import { Injectable } from '@nestjs/common';
import { PageRepository } from '../repository/page.repository';
import { PageDto } from '../dto/response/page.dto';
import { Page } from '../entity/page.entity';
import { PageCreateDto } from '../dto/request/page-create.dto';
import { PageUpdateDto } from '../dto/request/page-update.dto';
import { PageStatus } from '../enum/page-status.enum';
import { PageType } from '../enum/page-type.enum';

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

  async list(parentId?: number): Promise<PageDto[]> {
    if (parentId) {
      return this.getNextChildren(parentId);
    }

    return this.getMainCategoryList();
  }

  async ancestors(id: Page['id']): Promise<PageDto[]> {
    const page = await this.pageRepository.findById(id);

    if (!page) {
      return [];
    }

    const ancestors = await this.pageRepository.findAllAncestors(page.path);

    return this.transformListToPageDto([...ancestors, page]);
  }

  async getById(id: Page['id']): Promise<PageDto | null> {
    const entity = await this.pageRepository.findById(id);

    if (!entity) {
      return null;
    }

    return this.transformToPageDto(entity);
  }

  async update(updateDto: PageUpdateDto): Promise<PageDto> {
    const entity = await this.pageRepository.findById(updateDto.id);

    entity.title = updateDto.title;
    entity.description = updateDto.description;
    entity.order = updateDto.order;
    entity.seoTitle = updateDto.seoTitle;
    entity.seoDescription = updateDto.seoDescription;
    entity.slug = updateDto.slug;
    entity.status = updateDto.status;

    await this.pageRepository.save(entity);

    const isNotActiveStatus = [PageStatus.PENDING, PageStatus.DELETED].includes(
      entity.status,
    );
    const isCategory = [PageType.CATEGORY, PageType.MAIN_CATEGORY].includes(
      entity.type,
    );

    if (isNotActiveStatus && isCategory) {
      await this.pageRepository.updateChildrenStatus(
        entity.path,
        entity.status,
      );
    }

    return this.transformToPageDto(entity);
  }

  private async getMainCategoryList(): Promise<PageDto[]> {
    const mainCategoryList = await this.pageRepository.findMainCategoryList();

    return this.transformListToPageDto(mainCategoryList);
  }

  private async getNextChildren(parentId: number): Promise<PageDto[]> {
    const children = await this.pageRepository.findChildren(parentId, 1);

    return this.transformListToPageDto(children);
  }

  private async transformListToPageDto(entityList: Page[]): Promise<PageDto[]> {
    const request = entityList.map((e) => this.transformToPageDto(e));

    return Promise.all(request);
  }

  private async transformToPageDto(entity: Page): Promise<PageDto> {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      order: entity.order,
      type: entity.type,
      seoTitle: entity.seoTitle,
      seoDescription: entity.seoDescription,
      slug: entity.slug,
      path: entity.path,
      status: entity.status,
      createAt: entity.createdAt,
    };
  }
}
