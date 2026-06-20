import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize('employee_management', 'root', 'password123', {
    host: "localhost",
    dialect: "mysql"
});

export default db;