import dotenv from 'dotenv';

dotenv.config();

export default {
    database: {
        host: process.env.HOST_MYSQL,
        user: process.env.USER_MYSQL,
        password: process.env.PASSWORD_MYSQL,
        database: process.env.DATABASE_MYSQL
    }
}