import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '53b47e6a41b949',     // From your screenshot
    pass: '13d27593682fccc36aa6bff38d81d06f', // Replace with actual one (from dashboard, not stars)
  },
});

export default transporter;
