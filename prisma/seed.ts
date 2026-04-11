import { PrismaClient, PropertyStatus } from '@prisma/client';

const prisma = new PrismaClient();

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function main() {
  await prisma.property.deleteMany();

  type SeedProperty = {
    title: string;
    description: string;
    price: number;
    currency: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    sizeSqm: number;
    amenities: string[];
    images: string[];
    featured: boolean;
    status: PropertyStatus;
  };

  const items: SeedProperty[] = [
    {
      title: 'Modern 4 Bedroom Villa in Karen',
      description:
        'A refined contemporary villa with generous natural light, clean finishes, and a private garden. Designed for quiet luxury living with effortless indoor-outdoor flow.',
      price: 125000000,
      currency: 'KES',
      location: 'Karen, Nairobi',
      bedrooms: 4,
      bathrooms: 4,
      sizeSqm: 420,
      amenities: ['Garden', 'DSQ', 'Borehole', 'Security', 'Parking'],
      images: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    },
    {
      title: 'Luxury 2 Bedroom Apartment with Skyline Views',
      description:
        'An elevated apartment with panoramic city views, a calm neutral palette, and premium fixtures. Ideal for executives seeking a central, secure address.',
      price: 28000000,
      currency: 'KES',
      location: 'Westlands, Nairobi',
      bedrooms: 2,
      bathrooms: 2,
      sizeSqm: 135,
      amenities: ['Gym', 'Pool', 'Lift', 'Security', 'Backup Generator'],
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    },
    {
      title: 'Elegant 3 Bedroom Townhouse in Runda',
      description:
        'Tastefully designed townhouse in a leafy compound. Practical layout, soft finishes, and serene surroundings for family living.',
      price: 65000000,
      currency: 'KES',
      location: 'Runda, Nairobi',
      bedrooms: 3,
      bathrooms: 3,
      sizeSqm: 260,
      amenities: ['Garden', 'Security', 'Parking', 'DSQ'],
      images: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1600&q=80'
      ],
      featured: false,
      status: PropertyStatus.AVAILABLE
    }
  ];

  for (const p of items) {
    const slug = slugify(p.title);
    await prisma.property.create({
      data: {
        ...p,
        slug
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
