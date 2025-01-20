import { NextApiRequest, NextApiResponse } from 'next';
// import multiparty from 'multiparty';
import multiparty, { File as MultipartyFile } from 'multiparty';
import nodemailer from 'nodemailer';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false, // disables Next.js default body parser
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const form = new multiparty.Form();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({ error: 'Error parsing form data.' });
            }

            const name = fields.name?.[0];
            const email = fields.email?.[0];
            const message = fields.message?.[0];
            // const attachment = files.attachment?.[0]; // grab first file, if any

            // const attachments = files.attachment || [];
            const attachments = files.attachments || [];


            if (!name || !email || !message) {
                return res.status(400).json({ error: 'Please fill out all fields.' });
            }


            const maxFileSize = 15 * 1024 * 1024; // 15MB

            for (const file of attachments) {
                if (file.size > maxFileSize) {
                    return res.status(400).json({ error: `File ${file.originalFilename} is too large. Maximum allowed size is 15MB.` });
                }
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

            const nodemailerAttachments = attachments.map((file: any) => ({
                filename: file.originalFilename,
                path: file.path,
            }));

            //how the email sent to the user is formatted
            const mailOptionsToOwner = {
                from: process.env.ICLOUD_EMAIL,
                to: process.env.ICLOUD_EMAIL,
                subject: `New message from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                attachments: nodemailerAttachments,
                html: `
                    <h3>You have a new message from your website contact form</h3>
                    <ul>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Email:</strong> ${email}</li>
                    </ul>
                    <p><strong>Message:</strong><br>${message}</p>
                `,
            };

            //how the confirmation email sent to the user is formatted
            const mailOptionsToUser = {
                from: process.env.ICLOUD_EMAIL,
                to: email,
                subject: 'Email Confirmation: Your message has been sent and received',
                text: `Hello ${name},\n\nThank you for getting in touch! Here’s a copy of your message:\n\n${message}\n\nI'll get back to you as soon as I can.\n\nBest regards,\nJeongbin Son`,
                attachments: nodemailerAttachments,
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h3 style="color: #49A097; margin-bottom: 20px;">Hello ${name},</h3>
                        <p style="font-size: 16px; line-height: 1.5;">
                            Thank you for getting in touch! Here’s a copy of your message:
                        </p>
                        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="font-size: 16px; color: #333;"><strong>Message:</strong><br>${message}</p>
                        </div>
                        <p style="font-size: 16px; line-height: 1.5;">
                            I'll get back to you as soon as I can.
                        </p>
                        <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
                            Best regards,<br>
                            <span style="font-weight: bold; color: #49A097;">Jeongbin Son</span>
                        </p>
                        <hr style="border: none; border-top: 1px solid #49A097; margin-top: 30px;"/>
                        <p style="font-size: 12px; color: #777;">
                            This email was sent from <strong>Jeongbin Son’s Portfolio</strong>. To checkout the website, visit
                            <a href="https://jeongbinson.com/" style="color: #49A097; text-decoration: none;">https://jeongbinson.com/</a>.
                        </p>
                    </div>
                `,
            };

            try {
                // send me the email
                await transporter.sendMail(mailOptionsToOwner);

                // send user the confirmation email
                await transporter.sendMail(mailOptionsToUser);

                res.status(200).json({ success: true });
            } catch (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Error sending email.' });
            } finally {
                // delete all temporary files
                attachments.forEach((file: any) => {
                    if (file.path) {
                        fs.unlinkSync(file.path); // Delete the temporary file
                    }
                });
            }
        });


    } else {
        res.status(405).json({ message: 'Only POST requests allowed' });
    }
}
