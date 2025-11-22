import { getAuthSessionId, getAuthUserId } from '@convex-dev/auth/server';
import { query } from './_generated/server';

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    return await ctx.db.get(userId);
    // const account = await ctx.db
    //   .query('authAccounts')
    //   .withIndex('userIdAndProvider', (q) => q.eq('userId', userId))
    //   .first();
  },
});

export const currentSession = query({
  args: {},
  handler: async (ctx) => {
    const sessionId = await getAuthSessionId(ctx);
    if (sessionId === null) return null;
    return await ctx.db.get(sessionId);
  },
});
