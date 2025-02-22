import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'libreria_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'tu_contraseña',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

export default sequelize; 