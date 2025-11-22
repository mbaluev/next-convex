import { useQuery } from 'convex/react';
import { api } from '../../_convex/_generated/api';

export const useCurrentSession = () => {
  return useQuery(api.session.currentSession);
};
