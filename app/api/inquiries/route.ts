import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, message, propertyId } = body;

  if (!name || !email || !message || !propertyId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  await prisma.inquiry.create({
    data: {
      name,
      email,
      phone,
      message,
      propertyId
    }
  });

  return NextResponse.json({ success: true });
}
