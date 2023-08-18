import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PageType } from '../enum/page-type.enum';

@ValidatorConstraint({ async: true })
@Injectable()
export class CanBeRootPageConstraint implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Only page with type '${PageType.MAIN_CATEGORY}' can be root page.`;
  }

  validate(
    type: PageType,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const parentPageId = validationArguments.object['parentPageId'];

    if (!!parentPageId) {
      return true;
    }

    return type === PageType.MAIN_CATEGORY;
  }
}

export function CanBeRootPage(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CanBeRootPageConstraint,
    });
  };
}
