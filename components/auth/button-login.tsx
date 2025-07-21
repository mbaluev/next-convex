'use client';

import { useRouter } from 'next/navigation';
import { FormLogin } from '@/components/auth/form-login';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogToolbar,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button, ButtonProps } from '@/components/ui/button';
import { SvgLogo } from '@/components/svg/components/logo';
import { WidgetContent } from '@/components/layout/widget';

interface LoginButtonProps extends ButtonProps {
  mode?: 'modal' | 'redirect';
}

export const ButtonLogin = (props: LoginButtonProps) => {
  const { children, mode = 'redirect', asChild, ...rest } = props;
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/login');
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button {...rest}>{children}</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader separator>
            <DialogToolbar title={process.env.APP_NAME} icon={<SvgLogo />} close />
            <DialogDescription>welcome back</DialogDescription>
          </DialogHeader>
          <WidgetContent variant="dialog">
            <FormLogin />
          </WidgetContent>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button onClick={onClick} className="cursor-pointer" {...rest}>
      {children}
    </Button>
  );
};
