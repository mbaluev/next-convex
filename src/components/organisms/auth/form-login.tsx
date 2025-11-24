'use client';

import * as z from 'zod';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/auth/schema';
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';
import { AlertError } from '@/components/atoms/alert';
import { MouseEvent, useState, useTransition } from 'react';
import { InputPassword } from '@/components/atoms/input-password';
import { ButtonBack } from '@/components/organisms/auth/button-back';
import { Spinner } from '@/components/atoms/spinner';
import { useAuthActions } from '@convex-dev/auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/auth/routes';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'sonner';

export const FormLogin = () => {
  const [pending, startTransition] = useTransition();
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
    console.log('-->', error);
    toast.error(String(error));
  };
  const handlePassword = async (values: z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(values);
    if (!validatedFields.success) {
      setError('invalid fields');
    } else {
      const { email, password } = validatedFields.data;
      const body: Record<string, any> = { flow: 'signIn', email, password };
      setError(undefined);
      startTransition(() => signIn('signin', body).then(handleSuccess).catch(handleError));
    }
  };
  const handleOAuth = async (e: MouseEvent<HTMLButtonElement>, provider: 'google' | 'github') => {
    e.preventDefault();
    const callbackUrl = new URL(DEFAULT_LOGIN_REDIRECT, window.location.href).href;
    startTransition(() => signIn(provider, { callbackUrl }).then(handleSuccess).catch(handleError));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handlePassword)} className="space-y-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormControl>
                  <InputPassword
                    {...field}
                    disabled={pending}
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
        </div>
        <AlertError message={error} />
        <Button type="submit" className="w-full" disabled={pending}>
          {pending && <Spinner />}
          login
        </Button>
        <div className="flex items-center w-full gap-x-6">
          <Button
            className="w-full"
            variant="outline"
            onClick={(e) => handleOAuth(e, 'google')}
            disabled={pending}
          >
            <FcGoogle className="h-8 w-8" />
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={(e) => handleOAuth(e, 'github')}
            disabled={pending}
          >
            <FaGithub className="h-8 w-8" />
          </Button>
        </div>
        <ButtonBack href="/auth/register" label="don't have an account?" />
      </form>
    </Form>
  );
};
