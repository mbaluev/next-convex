'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/utils/db';
import { registerSchema } from '@/auth/schemas';
import { getUserByEmail } from '@/auth/api/user';
import { generateVerificationToken } from '@/lib/utils/tokens';
import { sendVerificationEmail } from '@/lib/utils/mail';

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'invalid fields' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'email already in use' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email as string, verificationToken.token as string);

  return { success: 'confirmation email send' };
};
