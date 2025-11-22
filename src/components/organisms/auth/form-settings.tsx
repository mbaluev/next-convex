'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/atoms/button';
import { useTransition } from 'react';
import { settingsSchema } from '@/auth/schemas';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/form';
import { Input } from '@/components/atoms/input';
import { useCurrentUser } from '@/auth/hooks/use-current-user';
import { Spinner } from '@/components/atoms/spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar';
import { User } from 'lucide-react';

export const FormSettings = () => {
  const user = useCurrentUser();
  // const { update } = useSession();
  const [loading, startTransition] = useTransition();
  const disabled = true;

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      image: user?.image || undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    console.log(values);
    // startTransition(() => {
    //   settings(values)
    //     .then((data) => {
    //       if (data.error) toast.error(data.error);
    //       if (data.success) update().then(() => toast.success(data.success));
    //     })
    //     .catch(() => toast.error('something went wrong'));
    // });
  };

  const _formItem = 'grid gap-x-6 gap-y-4 grid-cols-1 sm:grid-cols-3 space-y-0';
  const _formLabel = 'flex items-center md:justify-end text-muted-foreground';
  const _formControl = 'sm:col-span-2 overflow-hidden';
  const _formMessage = 'sm:col-span-2 sm:col-start-2';
  const _buttonSubmit = 'sm:col-start-2 sm:col-span-2 md:col-start-3 md:col-span-1';

  return (
    <Form {...form}>
      <form className="space-y-12" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-x-6 flex flex-row">
          <Avatar className="w-20 h-20 bg-secondary rounded-md">
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback className="bg-secondary">
              <User className="text-xl" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-6 flex-grow">
            <FormItem className={_formItem}>
              <FormLabel className={_formLabel}>id</FormLabel>
              <FormControl className={_formControl}>
                <p className="text-ellipsis">{user?._id}</p>
              </FormControl>
              <FormMessage className={_formMessage} />
            </FormItem>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className={_formItem}>
                  <FormLabel className={_formLabel}>name</FormLabel>
                  <FormControl className={_formControl}>
                    <Input {...field} placeholder="name" disabled={disabled} />
                  </FormControl>
                  <FormMessage className={_formMessage} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={_formItem}>
                  <FormLabel className={_formLabel}>email</FormLabel>
                  <FormControl className={_formControl}>
                    <Input {...field} placeholder="email" type="email" disabled={disabled} />
                  </FormControl>
                  <FormMessage className={_formMessage} />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className={_formItem}>
          <Button type="submit" className={_buttonSubmit} disabled={disabled}>
            {loading && <Spinner />}
            save
          </Button>
        </div>
      </form>
    </Form>
  );
};
