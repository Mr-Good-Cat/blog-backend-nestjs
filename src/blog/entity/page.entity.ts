import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PageType } from '../enum/page-type.enum';
import { PageStatus } from '../enum/page-status.enum';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  order: number;

  @Column({ type: 'enum', enum: PageType })
  type: PageType;

  @Column({ name: 'seo_title' })
  seoTitle: string;

  @Column({ name: 'seo_description' })
  seoDescription: string;

  @Column('ltree', { nullable: true })
  path: string;

  @Column()
  slug: string;

  @Column({ type: 'enum', enum: PageStatus, default: PageStatus.PENDING })
  status: PageStatus;
}
