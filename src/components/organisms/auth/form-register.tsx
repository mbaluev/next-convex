'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/auth/schema';
import { Input } from '@/components/atoms/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/form';
import { Button } from '@/components/atoms/button';
import { AlertError } from '@/components/atoms/alert';
import { useState, useTransition } from 'react';
import { InputPassword } from '@/components/atoms/input-password';
import { ButtonBack } from '@/components/organisms/auth/button-back';
import { Spinner } from '@/components/atoms/spinner';
import { useAuthActions } from '@convex-dev/auth/react';
import { toast } from 'sonner';

export const FormRegister = () => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const { signIn } = useAuthActions();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const handleSuccess = async () => {
    form.reset();
    toast.success('check you email');
  };
  const handleError = async (error: any) => {
    console.log('-->', error);
    toast.error(String(error));
  };
  const handleRegister = async (values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values);
    if (!validatedFields.success) {
      setError('invalid fields');
    } else {
      const { name, email, password } = validatedFields.data;
      const body: Record<string, any> = { flow: 'signUp', name, email, password };
      setError(undefined);
      startTransition(() => signIn('signin', body).then(handleSuccess).catch(handleError));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormControl>
                  <Input
                    {...field}
                    disabled={pending}
                    placeholder="enter full name"
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
        </div>
        <AlertError message={error} />
        <Button type="submit" className="w-full" disabled={pending}>
          {pending && <Spinner />}
          create an account
        </Button>
        <ButtonBack href="/auth/login" label="already have an account?" />
      </form>
    </Form>
  );
};
