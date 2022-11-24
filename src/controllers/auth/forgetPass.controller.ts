import { Request, Response } from 'express';
import { UserModel } from '../../models/User.model';
import log from '../../utils/logger';
import sentEmail from '../../utils/mailer';

const ForgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.send({
                status: 400,
                error: true,
                message: 'Invalid Request'
            });
        }

        const user = await UserModel.findOne({
            email: email
        });

        if (!user) {
            return res.send({
                message: 'There is no user in this email'
            });
        }

        let code: number = Math.floor(100000 + Math.random() * 900000);
        let response = await sentEmail(user.email, code);

        if (response.error) {
            return res.status(500).json({
                error: true,
                message: "Couldn't send mail. Please try again"
            });
        }
        user.passwordResetToken = code;
        await user.save();

        return res.send({
            success: true,
            message: 'Emailed Password reset token'
        });
    } catch (error: any) {
        log.error(error);
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
};
export default ForgotPassword;
