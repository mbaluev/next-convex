import { getAuthSessionId, getAuthUserId } from '@convex-dev/auth/server';
import { query } from './_generated/server';

export const current = query({
  args: {},
  handler: async (ctx) => {
    const sessionId = await getAuthSessionId(ctx);
    if (sessionId === null) return null;
    return await ctx.db.get(sessionId);
  },
});
