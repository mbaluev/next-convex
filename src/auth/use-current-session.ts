import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const useCurrentSession = () => {
  return useQuery(api.session.current);
};
