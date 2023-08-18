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

@ValidatorConstraint({ async: true })
@Injectable()
export class CanPageHasNestedPageConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly pageRepository: PageRepository) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Only page with type "${PageType.MAIN_CATEGORY}" and "${PageType.CATEGORY}" can have nested page.`;
  }

  validate(
    pageId: number,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return this.pageRepository.findById(pageId).then((page) => {
      return (
        !!page &&
        [PageType.MAIN_CATEGORY, PageType.CATEGORY].includes(page.type)
      );
    });
  }
}

export function CanPageHasNestedPage(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CanPageHasNestedPageConstraint,
    });
  };
}
