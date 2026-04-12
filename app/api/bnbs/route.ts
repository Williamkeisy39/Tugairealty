import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const token = cookies().get('admin_token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const bnb = await prisma.bnb.create({
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      pricePerNight: body.pricePerNight,
      currency: body.currency || 'KES',
      location: body.location,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      maxGuests: body.maxGuests || 2,
      sizeSqm: body.sizeSqm || null,
      amenities: body.amenities || [],
      images: body.images || [],
      featured: body.featured || false
    }
  });

  return NextResponse.json(bnb);
}
