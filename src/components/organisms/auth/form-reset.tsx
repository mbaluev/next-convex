'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetSchema } from '@/auth/schemas';
import { Input } from '@/components/atoms/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/form';
import { Button } from '@/components/atoms/button';
import { AlertSuccess, AlertError } from '@/components/atoms/alert';
import { useState, useTransition } from 'react';
import { ButtonBack } from '@/components/organisms/auth/button-back';
import { Spinner } from '@/components/atoms/spinner';

export const FormReset = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof resetSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    // startTransition(() => {
    //   reset(values).then((data) => {
    //     setError(data?.error);
    //     setSuccess(data?.success);
    //   });
    // });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
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
        </div>
        <AlertError message={error} />
        <AlertSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Spinner />}
          send reset email
        </Button>
        <ButtonBack href="/auth/login" label="back to login" />
      </form>
    </Form>
  );
};
