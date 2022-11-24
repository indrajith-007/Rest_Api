import { Request, Response } from 'express';
import { User, UserModel } from '../../models/User.model';
import { v4 as uuidv4 } from 'uuid';
import log from '../../utils/logger';
import sentEmail from '../../utils/mailer';

const createUser = async (req: Request, res: Response) => {
    const userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) {
        res.status(400).json({ error: true, message: 'Email is already in use' });
    }

    const id = uuidv4();
    req.body.userId = id;

    let token: number = Math.floor(100000 + Math.random() * 900000);

    const sendCode = await sentEmail(req.body.email, token);
    if (sendCode.error) {
        return res.status(500).json({
            error: true,
            message: "Couldn't send verification email."
        });
    }

    req.body.code = token;

    try {
        const user: User = await UserModel.create({ ...req.body });
        res.status(201).json({ success: true, message: 'Registration Success' });
    } catch (err) {
        log.error(err);
        res.status(500).send('Internal Server error Occured');
    }
};

export default createUser;
