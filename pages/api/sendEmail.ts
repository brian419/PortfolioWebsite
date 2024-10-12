import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        console.log('ICLOUD_EMAIL:', process.env.ICLOUD_EMAIL);
        console.log('ICLOUD_APP_PASSWORD:', process.env.ICLOUD_APP_PASSWORD);

        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.me.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.ICLOUD_EMAIL,
                pass: process.env.ICLOUD_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.ICLOUD_EMAIL,
            to: process.env.ICLOUD_EMAIL,
            subject: `New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        }
    } else {
        res.status(405).json({ message: 'Only POST requests allowed' });
    }
}
