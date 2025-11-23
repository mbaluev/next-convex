import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, { message: 'email is required' }).email({ message: 'invalid email' }),
  password: z.string().min(1, { message: 'password is required' }),
});

export const registerSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  email: z.string().min(1, { message: 'email is required' }).email({ message: 'invalid email' }),
  password: z
    .string()
    .min(1, { message: 'password is required' })
    .min(6, { message: 'minimum 6 characters required' }),
});

export const resetSchema = z.object({
  email: z.string().min(1, { message: 'email is required' }).email({ message: 'invalid email' }),
});

export const newPasswordSchema = z.object({
  code: z.string().min(6, { message: 'code is required' }),
  newPassword: z
    .string()
    .min(1, { message: 'new password is required' })
    .min(6, { message: 'minimum 6 characters required' }),
});

export const settingsSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email({ message: 'invalid email' }),
});
