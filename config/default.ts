import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    dbUri: process.env.DBURI,
    senderAddress: process.env.SENDER_ADD,
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
    secret: process.env.JWT_SECRET_KEY
};
