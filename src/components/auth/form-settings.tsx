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
import { Spinner } from '@/components/ui/spinner';

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

  const _formItem = 'grid gap-x-6 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-y-0';
  const _formLabel = 'flex items-center';
  const _formControl = 'md:col-span-2';
  const _formMessage = 'sm:col-start-2 md:col-span-2 md:col-start-2';
  const _buttonSubmit = 'sm:col-start-2 md:col-start-3';

  return (
    <Form {...form}>
      <form className="space-y-12" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FormItem className={_formItem}>
            <FormLabel className={_formLabel}>id</FormLabel>
            <FormControl className={_formControl}>
              <p>{user?.id}</p>
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
                  <Input {...field} placeholder="name" disabled={isPending} />
                </FormControl>
                <FormMessage className={_formMessage} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className={_formItem}>
                <FormLabel className={_formLabel}>role</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className={_formControl}>
                    <SelectTrigger>
                      <SelectValue placeholder="select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>admin</SelectItem>
                    <SelectItem value={UserRole.USER}>user</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className={_formMessage} />
              </FormItem>
            )}
          />
          {!user?.isOAuth && (
            <Fragment>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={_formItem}>
                    <FormLabel className={_formLabel}>email</FormLabel>
                    <FormControl className={_formControl}>
                      <Input {...field} placeholder="email" type="email" disabled={isPending} />
                    </FormControl>
                    <FormMessage className={_formMessage} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className={_formItem}>
                    <FormLabel className={_formLabel}>password</FormLabel>
                    <FormControl className={_formControl}>
                      <InputPassword
                        {...field}
                        placeholder="password"
                        autoComplete="new-password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage className={_formMessage} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className={_formItem}>
                    <FormLabel className={_formLabel}>new password</FormLabel>
                    <FormControl className={_formControl}>
                      <InputPassword
                        {...field}
                        placeholder="new password"
                        autoComplete="new-password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage className={_formMessage} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className={_formItem}>
                    <FormLabel className={_formLabel}>two factor authentication</FormLabel>
                    <FormControl className={_formControl}>
                      <Switch
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className={_formMessage} />
                  </FormItem>
                )}
              />
            </Fragment>
          )}
        </div>
        <div className={_formItem}>
          <Button type="submit" className={_buttonSubmit} disabled={isPending}>
            {isPending && <Spinner />}
            save
          </Button>
        </div>
      </form>
    </Form>
  );
};
