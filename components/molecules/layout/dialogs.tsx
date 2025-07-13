'use client';

import { Fragment } from 'react';
import { ProfileDialog } from '@/components/organisms/profile/dialog';

const handleDialogOpen = (params: URLSearchParams, name: string, value: string) => {
  const dialogs_value = params.get(name);
  const dialogs = dialogs_value?.split(',');
  const _dialogs = dialogs?.filter((d) => d !== value) ?? [];
  _dialogs.push(value);
  const _dialogs_value = _dialogs?.join(',');
  if (_dialogs_value) params.set(name, _dialogs_value);
  else params.delete(name);
  return params;
};

const handleDialogClose = (params: URLSearchParams, name: string, value: string) => {
  const dialogs_value = params.get(name);
  const dialogs = dialogs_value?.split(',');
  const _dialogs = dialogs?.filter((d) => d !== value);
  const _dialogs_value = _dialogs?.join(',');
  if (_dialogs_value) params.set(name, _dialogs_value);
  else params.delete(name);
  return params;
};

const Dialogs = () => {
  return (
    <Fragment>
      <ProfileDialog />
    </Fragment>
  );
};

export { Dialogs, handleDialogOpen, handleDialogClose };
