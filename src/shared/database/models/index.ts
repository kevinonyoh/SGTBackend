import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
console.log(env);
const sequelizeConfig = require('../config/config')[env];

const sequelize = new Sequelize({ ...sequelizeConfig });

export default sequelize;
