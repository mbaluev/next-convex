import { Email } from '@convex-dev/auth/providers/Email';
import { Resend } from 'resend';
import { generateToken } from './generate_token';

export const ResetPassword = Email({
  id: 'signin',
  apiKey: process.env.RESEND_API_KEY,
  maxAge: 60 * 15,
  generateVerificationToken: generateToken,
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new Resend(provider.apiKey);
    const { error } = await resend.emails.send({
      from: `${process.env.APP_NAME}<onboarding@${process.env.RESEND_DOMAIN}>`,
      to: [email],
      subject: `${process.env.APP_NAME} - reset password`,
      html: `<p>your verification code is <b>${token}</b></p>`,
    });
    if (error) throw new Error(JSON.stringify(error));
  },
});
