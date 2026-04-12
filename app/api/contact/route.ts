import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  await prisma.contactMessage.create({
    data: {
      name,
      email,
      phone: phone || null,
      subject,
      message
    }
  });

  return NextResponse.json({ success: true });
}
