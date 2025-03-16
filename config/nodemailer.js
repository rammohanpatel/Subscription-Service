import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  export default transporter;