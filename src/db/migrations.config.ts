import { DataSource } from 'typeorm';
import { DatabaseNamingStrategy } from 'src/db/database-naming.strategy';
import * as dotenv from "dotenv"; 
dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: +process.env.DATABASE_PORT,
  // url: process.env.DATABASE_URL,
  namingStrategy: new DatabaseNamingStrategy(),
  migrations: [`${__dirname}/../**/migrations/*{.js,.ts}`],
  entities: [`${__dirname}/../**/*.entity{.js,.ts}`],
});
