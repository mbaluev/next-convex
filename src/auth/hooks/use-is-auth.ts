import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export const useIsAuth = () => {
  const session = useQuery(api.session.currentSession);
  return !!session;
};
