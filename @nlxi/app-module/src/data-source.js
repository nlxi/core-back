import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import configFactory from '#root/config/index.js' ;
import { buildOrmConfig } from '#root/config/orm.config.js';

dotenv.config();

export const AppDataSource = new DataSource(buildOrmConfig(configFactory().db));
