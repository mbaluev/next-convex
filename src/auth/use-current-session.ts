import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const useCurrentSession = () => {
  const data = useQuery(api.session.current);
  const pending = data === undefined;
  return { session: data, pending };
};
