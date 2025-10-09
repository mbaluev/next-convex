'use client';

import { forwardRef } from 'react';
import { logout } from '@/auth/actions/logout';
import { signOut } from 'next-auth/react';
import { Button, ButtonProps } from '@/components/ui/button';

const ButtonLogout = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, ...rest } = props;

  const onClick = async () => {
    await logout();
    await signOut();
  };

  return (
    <Button ref={ref} onClick={onClick} className="cursor-pointer" {...rest}>
      {children}
    </Button>
  );
});
ButtonLogout.displayName = 'ButtonLogout';

export { ButtonLogout };
