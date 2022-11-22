import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    } catch (err: any) {
        return res.status(400).json({ message: 'Password does not match' });
    }
};

export default validate;
