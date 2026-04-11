import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const { ownerName, email, phone, propertyTitle, location, description, bedrooms, bathrooms, sizeSqm, askingPrice, images } = body;

  if (!ownerName || !email || !phone || !propertyTitle || !location || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  await prisma.sellRequest.create({
    data: {
      ownerName,
      email,
      phone,
      propertyTitle,
      location,
      description,
      bedrooms: bedrooms ? Number(bedrooms) : null,
      bathrooms: bathrooms ? Number(bathrooms) : null,
      sizeSqm: sizeSqm ? Number(sizeSqm) : null,
      askingPrice: askingPrice ? Number(askingPrice) : null,
      images: images || []
    }
  });

  return NextResponse.json({ success: true });
}
