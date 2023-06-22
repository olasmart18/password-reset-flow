import nodemailer from 'nodemailer';




 const sendEmail = async (email, subject, text) => {
            try {
                // create a test account with smtp
     const test = await nodemailer.createTestAccount();
                //create mailer transporter
         const mailTransporter = nodemailer.createTransport({
            host: test.smtp.host,
            port: test.smtp.port,
            secure: test.smtp.secure,
            auth: {
                user: test.user,
                pass: test.pass
            }
        });

        
          await mailTransporter.sendMail({
                from: test.user,
                to: email,
                subject: subject,
                text: text
            });
            console.log('email sent successfully');
    } catch (err) {
        console.log(err, 'email could not be sent');
    }
};
export default sendEmail;