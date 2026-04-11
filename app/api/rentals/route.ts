import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const token = cookies().get('admin_token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { title, slug, description, rentPrice, currency, rentPeriod, location, bedrooms, bathrooms, sizeSqm, amenities, images, featured } = body;

  if (!title || !slug || !description || !rentPrice || !location) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  await prisma.rental.create({
    data: {
      title,
      slug,
      description,
      rentPrice: Number(rentPrice),
      currency: currency || 'KES',
      rentPeriod: rentPeriod || 'per month',
      location,
      bedrooms: Number(bedrooms) || 0,
      bathrooms: Number(bathrooms) || 0,
      sizeSqm: sizeSqm ? Number(sizeSqm) : null,
      amenities: amenities || [],
      images: images || [],
      featured: featured === true
    }
  });

  return NextResponse.json({ success: true });
}
