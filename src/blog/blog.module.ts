import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entity/page.entity';
import { PageController } from './controller/page.controller';
import { PageRepository } from './repository/page.repository';
import { PageService } from './service/page.service';
import { CanPageHasNestedPageConstraint } from './validation-rule/can-page-has-nested-page.rule';
import { CanPageBeNestedPageConstraint } from './validation-rule/can-page-be-nested-page.rule';
import { CanBeRootPageConstraint } from './validation-rule/can-be-root-page.rule';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  controllers: [PageController],
  providers: [
    PageRepository,
    PageService,
    CanPageHasNestedPageConstraint,
    CanPageBeNestedPageConstraint,
    CanBeRootPageConstraint,
  ],
})
export class BlogModule {}
