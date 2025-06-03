import nodemailer from 'nodemailer';


// Email configuration
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.example.com';
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587', 10);
const EMAIL_USER = process.env.EMAIL_USER || 'user@example.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'password';
const EMAIL_FROM = process.env.EMAIL_FROM || 'SoundKit <noreply@library-system.com>';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_PORT === 465, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendAccountInfosEmail = async (
  email: string,
  firstName: string,
  password: string
): Promise<boolean> => {
  try {

    await transporter.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: 'Account informations - SoundKit',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clapperboard-icon lucide-clapperboard">
              <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/>
              <path d="m6.2 5.3 3.1 3.9"/>
              <path d="m12.4 3.4 3.1 4"/>
              <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>
            </svg>
            <h2 style="color: #2563eb; margin-bottom: 5px;">Welcome to SoundKit!</h2>
            <div style="height: 4px; width: 60px; background-color: #2563eb; margin: 0 auto;"></div>
          </div>
          
          <p style="font-size: 16px;">Hello ${firstName},</p>
          
          <p style="font-size: 16px; line-height: 1.5;">An administrator has created an account for you in our instruments management system. To get started, you'll need to first login with.</p>
          
          <div style="background-color: #f9fafb; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px;"><strong>Your account details:</strong></p>
            <p style="margin: 5px 0; font-size: 14px;">Email: ${email}</p>
            <p style="margin: 5px 0; font-size: 14px;">Password: ${password}</p>
          </div>
          
          <div style="text-align: left; margin: 30px 0;">
            <p style="font-size: 16px; line-height: 1.5;">Once logged in, you can change your password in the profile section.</p>
          </div>
                    
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 5px;">Please note:</p>
            <ul style="font-size: 14px; color: #6b7280; padding-left: 20px; margin-top: 5px;">
              <li>Keep your credentials safe and do not share them with anyone.</li>
              <li>If you did not expect this email, please contact your administrator.</li>
            </ul>
          </div>
          
          <p style="margin-top: 30px; font-size: 14px;">Best regards,<br>The SoundKit Team</p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};