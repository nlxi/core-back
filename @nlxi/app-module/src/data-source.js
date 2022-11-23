import dotenv from 'dotenv';
import configFactory from '#root/config/index.js' ;
import { buildOrmConfig } from '#root/config/orm.config.js';
import { DataSource } from 'typeorm';
dotenv.config();

export const AppDataSource = new DataSource(buildOrmConfig(configFactory().db));
