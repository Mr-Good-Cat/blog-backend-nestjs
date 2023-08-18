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
}
