import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER || '',
        pass: process.env.USER_PASSWORD || '',
    },
});

export class EmailService {
    static async sendOtpEmail(to: string, otp: string): Promise<void> {
        const mailOptions = {
            from: process.env.USER || '',
            to,
            subject: "Your Verification OTP",
            text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
        };

        await transporter.sendMail(mailOptions);
    }
}
