import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PageRepository } from '../repository/page.repository';
import { Page } from '../entity/page.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistPageConstraint implements ValidatorConstraintInterface {
  constructor(private readonly pageRepository: PageRepository) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Page doest not exist wit id = '${validationArguments.value}'`;
  }

  validate(
    id: Page['id'],
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return this.pageRepository.findById(id).then((page) => !!page);
  }
}

export function IsExistPage(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsExistPageConstraint,
    });
  };
}
