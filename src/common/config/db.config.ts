import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('database', () => {
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    cli: {
      migrationsDir: 'src/common/migration',
    },
    synchronize: false,
    autoLoadEntities: true,
    entities: ['dist/**/entity/*.entity{.ts,.js}'],
    migrationsTableName: 'migration',
    migrations: ['dist/common/migration/*{.ts,.js}'],
    migrationsRun: process.env.MODE === 'PROD',
    ssl: parseInt(process.env.POSTGRES_SSL)
      ? {
          rejectUnauthorized: false,
        }
      : false,
    extra: {
      max: 80,
    },
  } as DataSourceOptions;
});
