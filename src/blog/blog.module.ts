import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entity/page.entity';
import { PageController } from './controller/page.controller';
import { PageRepository } from './repository/page.repository';
import { PageService } from './service/page.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  controllers: [PageController],
  providers: [PageRepository, PageService],
})
export class BlogModule {}
