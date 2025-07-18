import { createTransporter } from "../config/mail-transport";

export async function sendWelcomeEmail(email: string, name: string) {
    const transporter = await createTransporter();
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎉 Welcome to Our Platform!',
      html: `
        <div style="background-color:#0f172a; color:white; font-family:Arial, sans-serif; padding:30px; border-radius:8px;">
          <h1 style="color:white;">Welcome, ${name} 👋</h1>
          <p style="font-size:16px;">We’re excited to have you on board. You're now part of a vibrant and growing community.</p>
  
          <div style="margin:30px 0;">
            <a href="${process.env.CLIENT_URL}" style="
              background-color:#1d4ed8;
              color:white;
              text-decoration:none;
              padding:12px 24px;
              border-radius:6px;
              font-weight:bold;
              display:inline-block;
            ">Go to Dashboard</a>
          </div>
  
          <p style="color:#d1d5db;">Need help getting started? Just reply to this email or visit our Help Center.</p>
  
          <hr style="border-color:#334155; margin-top:30px;" />
          <p style="font-size:12px; color:#94a3b8;">You're receiving this email because you registered on our platform.</p>
        </div>
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      throw new Error('Failed to send welcome email. Please try again later.');
    }
  }
  
  export async function sendVerificationEmail(email: string, link: string) {
    const transporter = await createTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <div style="background-color:#0f172a; color:white; font-family:Arial, sans-serif; padding:30px; border-radius:8px;">
          <h2 style="color:white;">Verify Your Email 📩</h2>
          <p style="font-size:16px;">Thanks for signing up! Click the button below to verify your email address and activate your account.</p>
          
          <div style="margin:30px 0;">
            <a href="${link}" style="
              background-color:#1d4ed8;
              color:white;
              text-decoration:none;
              padding:12px 24px;
              border-radius:6px;
              font-weight:bold;
              display:inline-block;
            ">Verify Email</a>
          </div>
  
          <p style="font-size:14px; color:#d1d5db;">This link will expire in 24 hours. If you didn’t sign up, just ignore this email.</p>
  
          <hr style="border-color:#334155; margin-top:30px;" />
          <p style="font-size:12px; color:#94a3b8;">You're receiving this email because someone signed up with this address.</p>
        </div>
      `,
    });
  }

  export const sendResetPasswordEmail = async (email: string, resetLink: string) => {
    const transporter = await createTransporter();
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password',
      html: `
        <div style="background-color:#0f172a; color:white; font-family:Arial, sans-serif; padding:30px; border-radius:8px;">
          <h2 style="color:white;">Password Reset Request 🔐</h2>
          <p style="font-size:16px;">We received a request to reset your password. Click the button below to proceed:</p>
          
          <div style="margin:30px 0;">
            <a href="${resetLink}" style="
              background-color:#1d4ed8;
              color:white;
              text-decoration:none;
              padding:12px 24px;
              border-radius:6px;
              font-weight:bold;
              display:inline-block;
            ">Reset Password</a>
          </div>
  
          <p style="font-size:14px; color:#d1d5db;">If you didn't request this, you can safely ignore this email.</p>
          <p style="font-size:14px; color:#d1d5db;">This link will expire in 15 minutes for security reasons.</p>
  
          <hr style="border-color:#334155; margin-top:30px;" />
          <p style="font-size:12px; color:#94a3b8;">Security first — we’ll never ask for your password via email.</p>
        </div>
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send reset password email. Please try again later.');
    }
  };