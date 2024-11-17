const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false 
    }
  });
  


exports.sendWelcomeEmail = async (email) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to the Portfolio App!',
    text: 'Thank you for registering!'
  });
};


exports.sendVerificationCode = async (email, code) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your verification code',
    text: `Your verification code is: ${code}. It will expire in 5 minutes.`
  });
};


exports.sendActionNotification = async (email, action, details) => {
    try {
        const subject = `Action Notification: ${action}`;
        const text = `An action was performed on the Portfolio App:\n\n${details}\n\n`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text
        });
        console.log(`Notification email sent for action: ${action}`);
    } catch (error) {
        console.error('Failed to send notification email:', error.message);
    }
};

