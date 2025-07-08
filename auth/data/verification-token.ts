import { db } from '@/lib/utils/db';

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return await db.verificationToken.findUnique({ where: { token } });
  } catch (err) {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await db.verificationToken.findFirst({ where: { email } });
  } catch (err) {
    return null;
  }
};
