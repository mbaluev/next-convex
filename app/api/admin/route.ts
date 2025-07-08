import { NextResponse } from 'next/server';
import { currentRole } from '@/auth/lib/current-role';
import { UserRole } from '@prisma/client';

export async function GET() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}
