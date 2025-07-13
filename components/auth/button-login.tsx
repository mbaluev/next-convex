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
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button, ButtonProps } from '@/components/ui/button';

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
        <DialogContent className="max-w-lg" close>
          <VisuallyHidden>
            <DialogHeader>
              <DialogToolbar title="login to application" />
              <DialogDescription>welcome back</DialogDescription>
            </DialogHeader>
          </VisuallyHidden>
          <FormLogin />
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
