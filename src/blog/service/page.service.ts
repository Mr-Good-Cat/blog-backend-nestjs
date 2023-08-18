import { Injectable } from '@nestjs/common';
import { PageRepository } from '../repository/page.repository';

@Injectable()
export class PageService {
  constructor(private readonly pageRepository: PageRepository) {}
}
