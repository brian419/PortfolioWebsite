import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Please fill out all fields.' });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.me.com',
            port: 587,
            secure: false, 
            auth: {
                user: process.env.ICLOUD_EMAIL,
                pass: process.env.ICLOUD_APP_PASSWORD,
            },
        });

        // how the email sent to me is formatted in my inbox
        const mailOptionsToOwner = {
            from: process.env.ICLOUD_EMAIL,
            to: process.env.ICLOUD_EMAIL,
            subject: `New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <h3>You have a new message from your website contact form</h3>
                <ul>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                </ul>
                <p><strong>Message:</strong><br>${message}</p>
            `,
        };

        // how the email sent to the user is formatted
        const mailOptionsToUser = {
            from: process.env.ICLOUD_EMAIL,
            to: email, // user's email
            subject: 'Email Confirmation: Your message has been sent and received',
            text: `Hello ${name},\n\nThank you for getting in touch! Here’s a copy of your message:\n\n${message}\n\nI'll get back to you as soon as I can.\n\nBest regards,\nJeongbin Son`,
            html: `
                <h3>Hello ${name},</h3>
                <p>Thank you for getting in touch! Here’s a copy of your message:</p>
                <p><strong>Message:</strong><br>${message}</p>
                <p>I'll get back to you as soon as I can.</p>
                <p>Best regards,<br>Jeongbin Son</p>
            `,
        };

        try {
            // send user's email to me
            await transporter.sendMail(mailOptionsToOwner);

            // send confirmation email to user
            await transporter.sendMail(mailOptionsToUser);

            // send success response
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        }
    } else {
        res.status(405).json({ message: 'Only POST requests allowed' });
    }
}
