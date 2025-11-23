'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newPasswordSchema, resetSchema } from '@/auth/schema';
import { Input } from '@/components/atoms/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/form';
import { Button } from '@/components/atoms/button';
import { AlertSuccess, AlertError } from '@/components/atoms/alert';
import { useState, useTransition } from 'react';
import { ButtonBack } from '@/components/organisms/auth/button-back';
import { Spinner } from '@/components/atoms/spinner';
import { useAuthActions } from '@convex-dev/auth/react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/atoms/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { InputPassword } from '@/components/atoms/input-password';

export const FormReset = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();
  const [step, setStep] = useState<'forgot' | { email: string }>('forgot');

  const { signIn } = useAuthActions();
  const formReset = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });
  const formNewPassword = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      newPassword: '',
      code: '',
    },
  });
  const handleError = async () => {
    setError('something went wrong');
  };
  const handleReset = async (values: z.infer<typeof resetSchema>) => {
    const validatedFields = resetSchema.safeParse(values);
    if (!validatedFields.success) {
      setError('invalid fields');
    } else {
      const { email } = validatedFields.data;
      const body: Record<string, any> = { flow: 'reset', email };
      setError(undefined);
      startTransition(() =>
        signIn('signin', body)
          .then(() => setStep({ email }))
          .catch(handleError)
      );
    }
  };
  const handleNewPassword = async (values: z.infer<typeof newPasswordSchema>) => {
    const validatedFields = newPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
      setError('invalid fields');
    } else {
      const { newPassword, code } = validatedFields.data;
      const email = step === 'forgot' ? undefined : step.email;
      const body: Record<string, any> = { flow: 'reset-verification', email, code, newPassword };
      setError(undefined);
      startTransition(() =>
        signIn('signin', body)
          .then(() => setSuccess('password updated'))
          .catch(handleError)
      );
    }
  };

  if (step === 'forgot') {
    return (
      <Form {...formReset}>
        <form onSubmit={formReset.handleSubmit(handleReset)} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={formReset.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={pending}
                      placeholder="enter email"
                      type="email"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <AlertError message={error} />
          <Button type="submit" className="w-full" disabled={pending}>
            {pending && <Spinner />}
            reset password
          </Button>
          <ButtonBack href="/auth/login" label="back to login" />
        </form>
      </Form>
    );
  }

  return (
    <Form {...formNewPassword}>
      <form onSubmit={formNewPassword.handleSubmit(handleNewPassword)} className="space-y-6">
        <FormItem className="space-y-4">
          <FormControl>
            <Input value={step.email} disabled />
          </FormControl>
        </FormItem>
        <FormField
          control={formNewPassword.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormControl>
                <InputPassword
                  {...field}
                  disabled={pending}
                  placeholder="enter new password"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formNewPassword.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-4 space-y-0">
              <FormControl>
                <InputOTP {...field} disabled={pending} maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>check your email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertError message={error} />
        <AlertSuccess message={success} />
        <Button type="submit" className="w-full" disabled={pending}>
          {pending && <Spinner />}
          update password
        </Button>
        <ButtonBack href="/auth/login" label="back to login" />
      </form>
    </Form>
  );
};
