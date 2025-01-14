const nodemailer = require('nodemailer');
require('dotenv').config();  // بارگذاری متغیرهای محیطی از فایل .env

// تنظیمات انتقال ایمیل با استفاده از Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',  // استفاده از سرویس Gmail
  auth: {
    user: process.env.EMAIL_USER,  // ایمیل از متغیر محیطی
    pass: process.env.EMAIL_PASS,  // رمز عبور اپلیکیشن از متغیر محیطی
  },
});

// تابع ارسال ایمیل
const sendResetEmail = async (email, token) => {
  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
  console.log(resetUrl)
  const mailOptions = {
    from: process.env.EMAIL_USER,  // ایمیل ارسال‌کننده از متغیر محیطی
    to: email,  // ایمیل گیرنده
    subject: 'Password Reset Request',
    text: `Click the link below to reset your password:\n\n${resetUrl}`,
    html: `<h3>Click the link below to reset your password:</h3><a href="${resetUrl}">${resetUrl}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendResetEmail };
