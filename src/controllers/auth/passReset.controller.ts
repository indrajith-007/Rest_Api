import { Request, Response } from 'express';
import { UserModel } from '../../models/User.model';
import log from '../../utils/logger';

const ResetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        if (!token || !newPassword || !confirmPassword) {
            return res.json({
                error: true,
                message: 'Invalid Request'
            });
        }

        const user = await UserModel.findOne({
            passwordResetToken: req.body.token
        });

        if (!user) {
            return res.json({
                error: true,
                message: 'Password reset token is Invalid'
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                error: true,
                message: "Passwords didn't match"
            });
        }
        user.password = newPassword;
        user.passwordResetToken = undefined;
        await user.save();

        return res.send({
            success: true,
            message: 'Password has been chnaged'
        });
    } catch (error) {
        log.error('reset-password-error', error);
        return res.status(500).json({
            error: true,
            message: 'reset-password-error'
        });
    }
};
export default ResetPassword;
