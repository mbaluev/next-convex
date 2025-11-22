'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/atoms/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/auth/routes';
import { useSearchParams } from 'next/navigation';
import { MouseEvent } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';

export const ButtonsSocial = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const { signIn } = useAuthActions();
  const handleSignIn = async (e: MouseEvent<HTMLButtonElement>, provider: 'google' | 'github') => {
    e.preventDefault();
    const callbackUri = new URL(callbackUrl || DEFAULT_LOGIN_REDIRECT, window.location.href).href;
    await signIn(provider, { callbackUrl: callbackUri });
  };

  return (
    <div className="flex items-center w-full gap-x-6">
      <Button className="w-full" variant="outline" onClick={(e) => handleSignIn(e, 'google')}>
        <FcGoogle className="h-8 w-8" />
      </Button>
      <Button className="w-full" variant="outline" onClick={(e) => handleSignIn(e, 'github')}>
        <FaGithub className="h-8 w-8" />
      </Button>
    </div>
  );
};
