import { Request, Response } from 'express';
import { UserModel, validatePwd } from '../../models/User.model';
import generateJwt from '../../utils/generateJwt';

const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: 'Invalid Request'
            });
        }

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'Account Not Found'
            });
        }

        if (!user.active) {
            return res.status(404).json({
                error: true,
                message: 'Please activate your account'
            });
        }

        const isValid = await validatePwd(user.password, password);

        if (!isValid) {
            return res.status(400).json({
                error: true,
                message: 'Invalid Details'
            });
        }

        const { error, token } = await generateJwt(user.email, user.userId);
        if (error) {
            return res.status(500).json({
                error: true,
                message: 'Internal Error, Please try again later'
            });
        }
        user.accessToken = token;
        await user.save();

        return res.json({
            success: true,
            message: 'User Successfully logged In',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Error, Please try Again'
        });
    }
};
export default Login;
