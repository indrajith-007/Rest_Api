import { Request, Response } from 'express';
import { UserModel } from '../../models/User.model';
import log from '../../utils/logger';

const Activate = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.code) {
            return res.json({
                error: true,
                message: 'Invalid Request'
            });
        }
        const user = await UserModel.findOne({
            email: req.body.email,
            code: req.body.code
        });

        if (!user) {
            return res.json({
                error: true,
                message: 'Invalid details'
            });
        }

        if (user.active) {
            return res.send({
                error: true,
                message: 'Account already activated',
                status: 400
            });
        }

        user.code = undefined;
        await delete user.code;
        user.active = true;

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Account activated'
        });
    } catch (e) {
        log.error('activation-error', e);
        return res.status(500).json({
            error: true,
            message: 'Internal error'
        });
    }
};

export default Activate;
