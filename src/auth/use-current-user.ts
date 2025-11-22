import { useQuery } from 'convex/react';
import { api } from '../../_convex/_generated/api';

export const useCurrentUser = () => {
  return useQuery(api.session.currentUser);
};
