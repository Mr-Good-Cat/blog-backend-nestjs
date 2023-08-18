import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PageType } from '../enum/page-type.enum';
import { PageRepository } from '../repository/page.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class CanPageBeNestedPageConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly pageRepository: PageRepository) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Page with type '${validationArguments.value}' can not be nested page`;
  }

  validate(
    type: PageType,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const parentPageId = validationArguments.object['parentPageId'];

    if (!parentPageId) {
      return true;
    }

    if (type === PageType.MAIN_CATEGORY && !!parentPageId) {
      return false;
    }

    return this.pageRepository.findById(parentPageId).then((page) => {
      if (!page) {
        return false;
      }

      if (type === PageType.ARTICLE && page.type === PageType.MAIN_CATEGORY) {
        return false;
      }

      return true;
    });
  }
}

export function CanPageBeNestedPage(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CanPageBeNestedPageConstraint,
    });
  };
}
