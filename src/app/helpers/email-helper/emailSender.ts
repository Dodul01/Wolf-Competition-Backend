import nodemailer from 'nodemailer';
import config from '../../../config';
import { IEmailFeilds } from '../interface/emailHelper.interface';
import { errorLogger, logger } from '../../../shared/logger';
import colors from 'colors';

const sendEmail = async (emailDetails: IEmailFeilds, retries: number = 3, delay: number = 2000) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.resend.com',
        secure: true,
        port: 465,
        auth: {
            user: config.resend.user,
            pass: config.resend.api_key
        }
    });

    const { from, to, template } = emailDetails
    const { subject, html } = template;

    let attempt = 0;
    let emailSent = false;

    while (attempt < retries && !emailSent) {
        try {
            const info = await transporter.sendMail({
                from: from,
                to: to,
                subject: subject,
                html: html
            });

            if (info.messageId) {
                logger.info(colors.bgGreen(colors.black(`🚀 Email sent successfully.....`)));
                emailSent = true;
            }

        } catch (error) {
            attempt++;
            errorLogger.error(error);

            if (attempt < retries) {
                await new Promise(resolve => setTimeout(resolve, delay))
            }
        }
    }
}

export default sendEmail;