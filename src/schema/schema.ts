import { z } from 'zod';

export const registerSchema = z.object({
    body: z
        .object({
            username: z.string({
                required_error: 'Username is required'
            }),
            email: z
                .string({
                    required_error: 'Email is required'
                })
                .email('Not a valid email'),
            password: z.string({
                required_error: 'Password is required'
            }),
            confirmPassword: z.string({
                required_error: 'Please Confirm Password'
            })
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'Password does not match',
            path: ['confirmPassword']
        })
});
