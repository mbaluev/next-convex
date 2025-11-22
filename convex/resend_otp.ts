import { Email } from '@convex-dev/auth/providers/Email';
import { Resend } from 'resend';
import { RandomReader, generateRandomString } from '@oslojs/crypto/random';

export const ResendOtp = Email({
  id: 'resend-otp',
  apiKey: process.env.RESEND_API_KEY,
  maxAge: 60 * 15,
  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes) {
        crypto.getRandomValues(bytes);
      },
    };
    const alphabet = '0123456789';
    const length = 6;
    return generateRandomString(random, alphabet, length);
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new Resend(`${process.env.RESEND_API_KEY}`);
    const { error } = await resend.emails.send({
      from: `${process.env.APP_NAME}<onboarding@${process.env.RESEND_DOMAIN}>`,
      to: [email],
      subject: `reset your password`,
      text: 'your password reset code is ' + token,
    });
    if (error) throw new Error(JSON.stringify(error));
  },
});
