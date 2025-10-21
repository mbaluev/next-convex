import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

const schema = defineSchema({
  ...authTables,
  tasks: defineTable({
    text: v.optional(v.string()),
    isCompleted: v.optional(v.boolean()),
  }),
  transitions: defineTable({
    a: v.optional(v.number()),
    b: v.optional(v.number()),
    c: v.optional(v.number()),
    date: v.optional(v.string()),
  }),
});

export default schema;
