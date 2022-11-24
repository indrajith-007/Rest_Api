import jwt from 'jsonwebtoken';
import config from 'config';

const generateJwt = async (email: string, userId: string) => {
    const secret = config.get<string>('secret');

    const options = {
        expiresIn: '1h'
    };

    try {
        const payload = { email: email, userId: userId };
        const token = await jwt.sign(payload, secret, options);
        return { error: false, token: token };
    } catch (error) {
        return { error: true };
    }
};
