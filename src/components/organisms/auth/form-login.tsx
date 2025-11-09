'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/auth/schemas';
import { Input } from '@/components/atoms/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/atoms/form';
import { Button } from '@/components/atoms/button';
import { AlertSuccess, AlertError } from '@/components/atoms/alert';
import { Fragment, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { InputPassword } from '@/components/atoms/input-password';
import Link from 'next/link';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/atoms/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ButtonsSocial } from '@/components/organisms/auth/buttons-social';
import { ButtonBack } from '@/components/organisms/auth/button-back';
import { Spinner } from '@/components/atoms/spinner';
import { useAuthActions } from '@convex-dev/auth/react';
import { toast } from 'sonner';

export const FormLogin = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const isAuthError = searchParams.get('error') === 'OAuthAccountNotLinked';
  const urlError = isAuthError ? 'email already in use with different provider' : '';

  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const { signIn } = useAuthActions();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(values);
    if (!validatedFields.success) {
      setError('invalid fields');
    } else {
      const { email, password, code } = validatedFields.data;

      const formData = new FormData();
      formData.append('flow', 'signIn');
      formData.append('email', email);
      formData.append('password', password);
      if (code) formData.append('code', code);

      setError(undefined);
      setSuccess(undefined);
      startTransition(() => {
        signIn('password', formData)
          .then((data) => {
            console.log(data);
            form.reset();
            setSuccess('success');
          })
          .catch((error) => {
            console.log(error);
            setError(String(error));
          });
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          {showTwoFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-y-4 space-y-0">
                  <FormControl>
                    <InputOTP
                      {...field}
                      disabled={isPending}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
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
          )}
          {!showTwoFactor && (
            <Fragment>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="enter email"
                        type="email"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormControl>
                      <InputPassword
                        {...field}
                        disabled={isPending}
                        placeholder="enter password"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="link" className="px-0 py-0 h-auto" asChild>
                <Link href="/auth/reset">forgot password?</Link>
              </Button>
            </Fragment>
          )}
        </div>
        <AlertError message={error || urlError} />
        <AlertSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Spinner />}
          {showTwoFactor ? 'confirm code' : 'login'}
        </Button>
        <ButtonsSocial />
        <ButtonBack href="/auth/register" label="don't have an account?" />
      </form>
    </Form>
  );
};
