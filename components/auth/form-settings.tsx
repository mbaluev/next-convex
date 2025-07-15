'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { settings } from '@/auth/actions/settings';
import { Fragment, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { settingsSchema } from '@/auth/schemas';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/auth/hooks/use-current-user';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserRole } from '@prisma/client';
import { Switch } from '@/components/ui/switch';
import { InputPassword } from '@/components/ui/input-password';
import { toast } from 'sonner';

export const FormSettings = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) toast.error(data.error);
          if (data.success) update().then(() => toast.success(data.success));
        })
        .catch(() => toast.error('something went wrong'));
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FormItem orientation="horizontal">
            <FormLabel>id</FormLabel>
            <FormControl orientation="horizontal">
              <p>{user?.id}</p>
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem orientation="horizontal">
                <FormLabel>name</FormLabel>
                <FormControl orientation="horizontal">
                  <Input {...field} placeholder="name" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!user?.isOAuth && (
            <Fragment>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem orientation="horizontal">
                    <FormLabel>email</FormLabel>
                    <FormControl orientation="horizontal">
                      <Input {...field} placeholder="email" type="email" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem orientation="horizontal">
                    <FormLabel>password</FormLabel>
                    <FormControl orientation="horizontal">
                      <InputPassword
                        {...field}
                        placeholder="password"
                        autoComplete="new-password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem orientation="horizontal">
                    <FormLabel>new password</FormLabel>
                    <FormControl orientation="horizontal">
                      <InputPassword
                        {...field}
                        placeholder="new password"
                        autoComplete="new-password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Fragment>
          )}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem orientation="horizontal">
                <FormLabel>role</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl orientation="horizontal">
                    <SelectTrigger>
                      <SelectValue placeholder="select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>admin</SelectItem>
                    <SelectItem value={UserRole.USER}>user</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {!user?.isOAuth && (
            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem orientation="horizontal">
                  <FormLabel>two factor authentication</FormLabel>
                  <FormControl orientation="horizontal">
                    <Switch
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="pt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="md:col-span-2" />
          <Button size="lg" type="submit" disabled={isPending}>
            save
          </Button>
        </div>
      </form>
    </Form>
  );
};
