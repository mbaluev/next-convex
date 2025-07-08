import crypto from 'crypto';
import { db } from '@/lib/utils/db';
import { v4 as uuid } from 'uuid';
import { getVerificationTokenByEmail } from '@/auth/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/auth/data/password-reset-token';
import { getTwoFactorTokenByEmail } from '@/auth/data/two-factor-token';

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }
  return db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }
  return db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }
  return db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};
