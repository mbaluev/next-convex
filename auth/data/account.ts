import { db } from '@/lib/utils/db';

export const getAccountByUserId = async (userId: string) => {
  try {
    return await db.account.findFirst({ where: { userId } });
  } catch (err) {
    return null;
  }
};
