import { Express, Request, Response } from 'express';
import createUser from '../controllers/auth/createUser.controller';
import validate from '../middlewares/validate';
import { registerSchema } from '../schema/schema';
import Activate from '../controllers/auth/activate.controller';
import ForgotPassword from '../controllers/auth/forgetPass.controller';
import ResetPassword from '../controllers/auth/passReset.controller';
import Login from '../controllers/auth/loginUser.controller';

const routes = (app: Express) => {
    app.get('/health', (req: Request, res: Response) => res.status(200).json({ message: 'healthy' }));

    app.post('/user/signUp', validate(registerSchema), createUser);

    app.patch('/user/activate', Activate);

    app.patch('/user/forgetPassword', ForgotPassword);

    app.patch('/user/passwordReset', ResetPassword);

    app.post('/user/login', Login);
};

export default routes;
