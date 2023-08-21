import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PageRepository } from '../repository/page.repository';
import { PageType } from '../enum/page-type.enum';
import { Page } from '../entity/page.entity';
import { UrlService } from '../service/url.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueUrlConstraint implements ValidatorConstraintInterface {
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly urlService: UrlService,
  ) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Url already exist.';
  }

  validate(
    slug: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const parentPageId: number | undefined =
      validationArguments.object['parentPageId'];
    const type: PageType = validationArguments.object['type'];

    return this.isValid(slug, type, parentPageId);
  }

  private async isValid(
    slug: string,
    type: PageType,
    parentPageId: number | undefined,
  ): Promise<boolean> {
    const pageList = await this.pageRepository.findBySlug(slug);
    if (!pageList.length) {
      return true;
    }

    const pagesWithSameType = pageList.filter((page) => page.type === type);
    if (!pagesWithSameType.length) {
      return true;
    }

    if (!parentPageId) {
      return type !== PageType.MAIN_CATEGORY;
    }

    const parentPage = await this.pageRepository.findById(parentPageId);
    if (!parentPage) {
      return true;
    }

    const newPage = new Page();
    newPage.type = type;
    newPage.slug = slug;
    newPage.path = [...parentPage.path.split('.'), 'unknown']
      .filter((el) => !!el)
      .join('.');

    const newPageUrl = await this.urlService.to(newPage);

    const request: Promise<string>[] = [];
    for (const page of pagesWithSameType) {
      request.push(this.urlService.to(page));
    }

    const result = await Promise.all(request);

    return !result.some((u) => u === newPageUrl);
  }
}

export function IsUniqueUrl(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUniqueUrlConstraint,
    });
  };
}
