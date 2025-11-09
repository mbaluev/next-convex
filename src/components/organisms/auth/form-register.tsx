'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/auth/schemas';
import { Input } from '@/components/atoms/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/form';
import { Button } from '@/components/atoms/button';
import { AlertSuccess, AlertError } from '@/components/atoms/alert';
import { useState, useTransition } from 'react';
import { InputPassword } from '@/components/atoms/input-password';
import { ButtonBack } from '@/components/organisms/auth/button-back';
import { Spinner } from '@/components/atoms/spinner';
import { useAuthActions } from '@convex-dev/auth/react';

export const FormRegister = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const { signIn } = useAuthActions();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values);
    if (!validatedFields.success) {
      setError('invalid fields');
    } else {
      const { name, email, password } = validatedFields.data;
      const body: Record<string, any> = {
        flow: 'signUp',
        name: name,
        email: email,
        password: password,
      };
      setError(undefined);
      setSuccess(undefined);
      startTransition(() => {
        signIn('password', body)
          .then(() => {
            form.reset();
            setSuccess('success');
          })
          .catch((error) => {
            setError(String(error));
          });
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="enter name"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
        <AlertError message={error} />
        <AlertSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Spinner />}
          create an account
        </Button>
        <ButtonBack href="/auth/login" label="already have an account?" />
      </form>
    </Form>
  );
};
