'use client';

import * as z from 'zod';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/atoms/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/auth/schema';
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';
import { AlertSuccess, AlertError } from '@/components/atoms/alert';
import { Fragment, MouseEvent, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { InputPassword } from '@/components/atoms/input-password';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/atoms/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ButtonBack } from '@/components/organisms/auth/button-back';
import { Spinner } from '@/components/atoms/spinner';
import { useAuthActions } from '@convex-dev/auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/auth/routes';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export const FormLogin = () => {
  const searchParams = useSearchParams();
  const callback = searchParams.get('callback');
  const isAuthError = searchParams.get('error') === 'OAuthAccountNotLinked';
  const urlError = isAuthError ? 'email already in use with different provider' : '';

  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const { signIn } = useAuthActions();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleSuccess = async () => {
    form.reset();
  };
  const handleError = async (error: any) => {
    setError(String(error));
  };
  const handlePassword = async (values: z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(values);
    if (!validatedFields.success) {
      setError('invalid fields');
    } else {
      const callbackUrl = new URL(callback || DEFAULT_LOGIN_REDIRECT, window.location.href).href;
      const { email, password, code } = validatedFields.data;
      const body: Record<string, any> = { flow: 'signIn', email, password, code, callbackUrl };
      setError(undefined);
      startTransition(() => signIn('password', body).then(handleSuccess).catch(handleError));
    }
  };
  const handleSignIn = async (e: MouseEvent<HTMLButtonElement>, provider: 'google' | 'github') => {
    e.preventDefault();
    const callbackUrl = new URL(callback || DEFAULT_LOGIN_REDIRECT, window.location.href).href;
    startTransition(() => signIn(provider, { callbackUrl }).then(handleSuccess).catch(handleError));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handlePassword)} className="space-y-6">
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
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Spinner />}
          {showTwoFactor ? 'confirm code' : 'login'}
        </Button>
        <div className="flex items-center w-full gap-x-6">
          <Button
            className="w-full"
            variant="outline"
            onClick={(e) => handleSignIn(e, 'google')}
            disabled={isPending}
          >
            <FcGoogle className="h-8 w-8" />
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={(e) => handleSignIn(e, 'github')}
            disabled={isPending}
          >
            <FaGithub className="h-8 w-8" />
          </Button>
        </div>
        <ButtonBack href="/auth/register" label="don't have an account?" />
      </form>
    </Form>
  );
};
