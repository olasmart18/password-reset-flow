import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, text) => {
    try {
        const mailTransporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
            await mailTransporter.sendMail({
                from: process.env.USER,
                to: email,
                subject: subject,
                text: link
            });
            console.log('email sent successfully');
    } catch (err) {
        console.log(err, 'email could not be sent');
    }
};