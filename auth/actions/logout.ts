'use server';

import { signOut } from '@/auth/auth';

export const logout = async () => {
  // some server stuff
  await signOut();
};
