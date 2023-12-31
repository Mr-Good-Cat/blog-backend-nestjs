import { BadRequestException, Injectable } from '@nestjs/common';
import { PageRepository } from '../repository/page.repository';
import { UrlService } from './url.service';
import { Page } from '../entity/page.entity';
import { BlogMainCategoryDto } from '../dto/response/blog-main-category.dto';
import { BlogArticleDto } from '../dto/response/blog-article.dto';
import { BlogCategoryDto } from '../dto/response/blog-category.dto';
import { BlogAllCategoriesByMainCategoriesDto } from '../dto/response/blog-all-categories-by-main-categories.dto';
import { BlogBreadcrumbsDto } from '../dto/response/blog-breadcrumbs.dto';
import { BlogArticlePageDto } from '../dto/response/blog-article-page.dto';

const SPECIAL_CATEGORY_ALL = 'all';

@Injectable()
export class BlogService {
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly urlService: UrlService,
  ) {}

  async getMainCategory(): Promise<BlogMainCategoryDto[]> {
    const entityList = await this.pageRepository.findMainCategoryList();

    const request = entityList.map((e) =>
      this.transformToBlogMainCategoryDto(e),
    );

    return Promise.all(request);
  }

  async getNewArticle(
    mainCategorySlug: Page['slug'],
  ): Promise<BlogArticleDto[]> {
    const mainCategory = await this.pageRepository.getMainCategoryBySlug(
      mainCategorySlug,
    );

    if (!mainCategory) {
      throw new BadRequestException(
        `Not found page with slug = ${mainCategorySlug}`,
      );
    }

    const entityList = await this.pageRepository.findNewArticles(
      mainCategory.path,
    );

    const request = entityList.map((e) => this.transformToBlogArticleDto(e));

    return Promise.all(request);
  }

  async getAllCategoriesByMainCategories(): Promise<BlogAllCategoriesByMainCategoriesDto> {
    const mainCategoryList = await this.pageRepository.findMainCategoryList();

    const result = {};
    for (const mainCategory of mainCategoryList) {
      const allCategories = await this.pageRepository.findAllCategories(
        mainCategory.path,
      );

      const request = allCategories.map((e) =>
        this.transformToBlogCategoryDto(e),
      );

      result[mainCategory.slug] = await Promise.all(request);
    }

    return { result };
  }

  async getNestedArticles(
    mainCategorySlug: Page['slug'],
    categorySlug: Page['slug'],
  ): Promise<BlogArticleDto[]> {
    let path: Page['path'];

    if (categorySlug === SPECIAL_CATEGORY_ALL) {
      const mainCategory = await this.pageRepository.getMainCategoryBySlug(
        mainCategorySlug,
      );

      path = mainCategory.path;
    } else {
      const categoryList = await this.pageRepository.findBySlug(categorySlug);
      const urlList = await Promise.all(
        categoryList.map((c) => this.urlService.to(c)),
      );
      const indexOfCategory = urlList.indexOf(
        this.urlService.toCategory(mainCategorySlug, categorySlug),
      );

      path = categoryList[indexOfCategory].path;
    }

    const entityList = await this.pageRepository.findAllArticles(path);

    const request = entityList.map((e) => this.transformToBlogArticleDto(e));

    return Promise.all(request);
  }

  async getArticle(
    mainCategorySlug: Page['slug'],
    categorySlug: Page['slug'],
    articleSlug: Page['slug'],
  ): Promise<BlogArticlePageDto> {
    const articleList = await this.pageRepository.findBySlug(articleSlug);
    const urlList = await Promise.all(
      articleList.map((c) => this.urlService.to(c)),
    );
    const indexOfArticle = urlList.indexOf(
      this.urlService.toArticle(mainCategorySlug, categorySlug, articleSlug),
    );

    const article = articleList[indexOfArticle];
    const ancestors = await this.pageRepository.findAllAncestors(article.path);

    return this.transformToBlogArticlePageDto(article, ancestors);
  }

  private async transformToBlogCategoryDto(
    entity: Page,
  ): Promise<BlogCategoryDto> {
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

  private async transformToBlogArticleDto(
    entity: Page,
  ): Promise<BlogArticleDto> {
    const url = await this.urlService.to(entity);

    return {
      id: entity.id,
      title: entity.title,
      seoTitle: entity.seoTitle,
      seoDescription: entity.seoDescription,
      slug: entity.slug,
      description: entity.description,
      createdAt: entity.createdAt,
      url,
    };
  }

  private async transformToBlogMainCategoryDto(
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

  private async transformToBlogArticlePageDto(
    entity: Page,
    ancestors: Page[],
  ): Promise<BlogArticlePageDto> {
    const breadcrumbs = await Promise.all(
      ancestors.map((a) => this.transformToBlogBreadcrumbsDto(a)),
    );
    const url = await this.urlService.to(entity);

    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      seoTitle: entity.seoTitle,
      seoDescription: entity.seoDescription,
      slug: entity.slug,
      createdAt: entity.createdAt,
      url,
      breadcrumbs,
    };
  }

  private async transformToBlogBreadcrumbsDto(
    entity: Page,
  ): Promise<BlogBreadcrumbsDto> {
    const url = await this.urlService.to(entity);

    return {
      title: entity.title,
      url,
    };
  }
}
