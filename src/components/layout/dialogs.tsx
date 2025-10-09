'use client';

import { Fragment } from 'react';
import { ProfileDialog } from '@/components/organisms/dialogs/profile';
import { ROUTES } from '@/lib/settings/routes';

const DIALOG_SEARCH_PARAM_NAME = 'd';

const handleDialogOpen = (params: URLSearchParams, value: string) => {
  const dialogs_value = params.get(DIALOG_SEARCH_PARAM_NAME);
  const dialogs = dialogs_value?.split(',');
  const _dialogs = dialogs?.filter((d) => d !== value) ?? [];
  _dialogs.push(value);
  const _dialogs_value = _dialogs?.join(',');
  if (_dialogs_value) params.set(DIALOG_SEARCH_PARAM_NAME, _dialogs_value);
  else params.delete(DIALOG_SEARCH_PARAM_NAME);
  return params;
};

const handleDialogClose = (params: URLSearchParams, value: string) => {
  const dialogs_value = params.get(DIALOG_SEARCH_PARAM_NAME);
  const dialogs = dialogs_value?.split(',');
  const _dialogs = dialogs?.filter((d) => d !== value);
  const _dialogs_value = _dialogs?.join(',');
  if (_dialogs_value) params.set(DIALOG_SEARCH_PARAM_NAME, _dialogs_value);
  else params.delete(DIALOG_SEARCH_PARAM_NAME);
  return params;
};

const isDialogOpen = (params: URLSearchParams, value: string) => {
  return params.has(DIALOG_SEARCH_PARAM_NAME, value);
};

const Dialogs = () => {
  return (
    <Fragment>
      <ProfileDialog />
    </Fragment>
  );
};

export { DIALOG_SEARCH_PARAM_NAME, Dialogs, handleDialogOpen, handleDialogClose, isDialogOpen };
