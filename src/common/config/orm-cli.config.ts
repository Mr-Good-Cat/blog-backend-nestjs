import { ConfigModule } from '@nestjs/config';
import dbConfig from './db.config';
import { DataSource } from 'typeorm';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfig],
  envFilePath: ['.env.local', '.env'],
});

const dataSource = new DataSource(dbConfig());
dataSource.initialize();

export default dataSource;
