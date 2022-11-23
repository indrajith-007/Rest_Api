import nodemailer from 'nodemailer';
import log from './logger';
import config from 'config';

async function sentEmail(email: string, code: number) {
    const user = config.get<string>('user');
    const pass = config.get<string>('pass');
    const senderAddress = config.get<string>('senderAddress');

    let toAdress: string = email;

    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            secure: true,
            auth: {
                user: user,
                pass: pass
            }
        });
        await transporter.sendMail({
            from: senderAddress,
            to: toAdress,
            subject: 'Verify Your Email',
            text: 'hello',
            html: `<DOCTYPE>
            <html>
                <body>
                    <p>Your authentication code is: </p>
                    <b>${code}</b>
                </body>
            </html>`
        });

        return { error: false };
    } catch (err) {
        log.error(err);
        return {
            error: true,
            message: 'Cannot send email'
        };
    }
}

export default sentEmail;
