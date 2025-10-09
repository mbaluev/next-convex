'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/auth/actions/new-verification';
import { AlertSuccess, AlertError, AlertInfo } from '@/components/ui/alert';
import { router } from 'next/client';
import { ButtonBack } from '@/components/auth/button-back';

export const FormNewVerification = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('missing token');
      return;
    }
    newVerification(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success);
          router.push('/auth/login');
        }
        if (data.error) {
          setError(data.error);
        }
      })
      .catch(() => {
        setError('something went wrong');
      });
  }, [token]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex flex-col space-y-6 items-center w-full justify-center">
      {!success && !error && <AlertInfo message="verificatoin in progress..." loading />}
      <AlertSuccess message={success} />
      {!success && <AlertError message={error} />}
      <ButtonBack href="/auth/login" label="back to login" />
    </div>
  );
};
