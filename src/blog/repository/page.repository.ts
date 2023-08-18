import { Injectable } from '@nestjs/common';
import { Page } from '../entity/page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PageType } from '../enum/page-type.enum';

@Injectable()
export class PageRepository {
    constructor(
        @InjectRepository(Page)
        private readonly repository: Repository<Page>,
    ) {}
}
