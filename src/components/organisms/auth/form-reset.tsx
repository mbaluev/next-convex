'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetSchema } from '@/auth/schema';
import { Input } from '@/components/atoms/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/form';
import { Button } from '@/components/atoms/button';
import { AlertSuccess, AlertError } from '@/components/atoms/alert';
import { useState, useTransition } from 'react';
import { ButtonBack } from '@/components/organisms/auth/button-back';
import { Spinner } from '@/components/atoms/spinner';
import { useAuthActions } from '@convex-dev/auth/react';

export const FormReset = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();

  const { signIn } = useAuthActions();
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });
  const handleSuccess = async () => {
    form.reset();
    setSuccess('email send. check your email');
  };
  const handleError = async (error: any) => {
    setError(String(error));
  };
  const handleReset = async (values: z.infer<typeof resetSchema>) => {
    const validatedFields = resetSchema.safeParse(values);
    if (!validatedFields.success) {
      setError('invalid fields');
    } else {
      const { email, code } = validatedFields.data;
      const body: Record<string, any> = { email, code };
      setError(undefined);
      startTransition(() => signIn('resend-otp', body).then(handleSuccess).catch(handleError));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleReset)} className="space-y-6">
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
        </div>
        <AlertError message={error} />
        <AlertSuccess message={success} />
        <Button type="submit" className="w-full" disabled={pending}>
          {pending && <Spinner />}
          send reset email
        </Button>
        <ButtonBack href="/auth/login" label="back to login" />
      </form>
    </Form>
  );
};
