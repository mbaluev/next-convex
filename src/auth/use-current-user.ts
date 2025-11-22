import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const useCurrentUser = () => {
  return useQuery(api.users.current);
};
