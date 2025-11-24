import { Email } from '@convex-dev/auth/providers/Email';
import { Resend } from 'resend';
import { guid } from '../../src/utils/guid';

export const VerifyEmail = Email({
  id: 'signin',
  apiKey: process.env.RESEND_API_KEY,
  maxAge: 60 * 15,
  generateVerificationToken: guid,
  async sendVerificationRequest({ identifier: email, provider, url }) {
    const resend = new Resend(provider.apiKey);
    const { error } = await resend.emails.send({
      from: `${process.env.RESEND_APP_NAME}<onboarding@${process.env.RESEND_DOMAIN}>`,
      to: [email],
      subject: 'confirm your email',
      html: `<p>click <a href=${url}>here<a/> to confirm email</p>`,
    });
    if (error) throw new Error(JSON.stringify(error));
  },
});
