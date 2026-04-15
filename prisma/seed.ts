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
    },
    {
      title: 'Amaiya 1 Bedroom Apartment at Garden City',
      description:
        'Amaiya by Mi Vida Homes within Garden City Mall offers modern one-bedroom living with abundant natural light, contemporary layouts, and balcony views. Ideal for investors or homeowners seeking lifestyle convenience along Thika Road.',
      price: 8500000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 1,
      bathrooms: 1,
      sizeSqm: 55,
      amenities: [
        'Landscaped Park',
        'Heated Pool',
        'Gym',
        'Clubhouse',
        'BBQ Deck',
        'Jogging Track',
        'Kids Play Area',
        'Multi-Sports Court',
        'Security'
      ],
      images: [
        '/Amaiya%201.jpeg',
        '/Amaiya%201b%20interior.jpeg',
        '/Amaiya%201b%20interior1.jpeg'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    },
    {
      title: 'Amaiya 1 Bedroom Duplex at Garden City',
      description:
        'Amaiya by Mi Vida Homes within Garden City Mall offers modern one-bedroom duplex living with double-volume spaces, refined finishes, and balcony views. Ideal for investors or homeowners seeking lifestyle convenience along Thika Road.',
      price: 9900000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 1,
      bathrooms: 2,
      sizeSqm: 68,
      amenities: [
        'Landscaped Park',
        'Heated Pool',
        'Gym',
        'Clubhouse',
        'BBQ Deck',
        'Jogging Track',
        'Kids Play Area',
        'Multi-Sports Court',
        'Security'
      ],
      images: [
        '/Amaiya2.jpeg',
        '/Amaiya%201b%20interior1.1.jpeg',
        '/Amaiya%201b%20interior1.2.jpeg'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    },
    {
      title: 'Amaiya 2 Bedroom Duplex at Garden City',
      description:
        'Amaiya by Mi Vida Homes within Garden City Mall offers modern two-bedroom duplex living with spacious layouts, natural lighting, and private balconies. Ideal for investors or homeowners seeking lifestyle convenience along Thika Road.',
      price: 15000000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 2,
      bathrooms: 2,
      sizeSqm: 110,
      amenities: [
        'Landscaped Park',
        'Heated Pool',
        'Gym',
        'Clubhouse',
        'BBQ Deck',
        'Jogging Track',
        'Kids Play Area',
        'Multi-Sports Court',
        'Security'
      ],
      images: [
        '/Amaiya3.jpeg',
        '/Amaiya%201b%20interior1.4.jpeg',
        '/Amaiya%201b%20interior2.jpeg'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    },
    {
      title: 'Amaiya 3 Bedroom Apartment at Garden City',
      description:
        'Amaiya by Mi Vida Homes within Garden City Mall offers modern three-bedroom apartments with expansive layouts, generous light, and balcony views. Ideal for families seeking lifestyle convenience along Thika Road.',
      price: 17000000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 3,
      bathrooms: 2,
      sizeSqm: 135,
      amenities: [
        'Landscaped Park',
        'Heated Pool',
        'Gym',
        'Clubhouse',
        'BBQ Deck',
        'Jogging Track',
        'Kids Play Area',
        'Multi-Sports Court',
        'Security'
      ],
      images: [
        '/Amaiya4.jpeg',
        '/Amaiya%201b%20interior2.1.jpeg',
        '/Amaiya%201b%20interior1.1.jpeg'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    },
    {
      title: 'GTC Residence 1 Bedroom Apartment in Westlands',
      description:
        'Step into the vibrant Westlands neighborhood and experience a lifestyle like no other at GTC Residence Apartments. Positioned among stylish restaurants, cafés, and a modern shopping mall, GTC delivers unmatched comfort, convenience, and elegance for both end users and investors.',
      price: 222000,
      currency: 'USD',
      location: 'Westlands, Nairobi',
      bedrooms: 1,
      bathrooms: 1,
      sizeSqm: 65,
      amenities: [
        'Shopping Mall Access',
        'Restaurants & Cafés',
        'Concierge',
        'Gym',
        'Pool',
        'Security',
        'Parking'
      ],
      images: [
        '/Gtc%201.jpeg',
        '/GTC%202.jpeg',
        '/GTC%203.jpeg'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    },
    {
      title: 'GTC Residence 2 Bedroom Apartment in Westlands',
      description:
        'Step into the vibrant Westlands neighborhood and experience a lifestyle like no other at GTC Residence Apartments. Positioned among stylish restaurants, cafés, and a modern shopping mall, GTC delivers unmatched comfort, convenience, and elegance for both end users and investors.',
      price: 278000,
      currency: 'USD',
      location: 'Westlands, Nairobi',
      bedrooms: 2,
      bathrooms: 2,
      sizeSqm: 95,
      amenities: [
        'Shopping Mall Access',
        'Restaurants & Cafés',
        'Concierge',
        'Gym',
        'Pool',
        'Security',
        'Parking'
      ],
      images: [
        '/GTC%202.jpeg',
        '/Gtc%201.jpeg',
        '/GTC%203.jpeg'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    },
    {
      title: 'GTC Residence 3 Bedroom Apartment in Westlands',
      description:
        'Step into the vibrant Westlands neighborhood and experience a lifestyle like no other at GTC Residence Apartments. Positioned among stylish restaurants, cafés, and a modern shopping mall, GTC delivers unmatched comfort, convenience, and elegance for both end users and investors.',
      price: 347000,
      currency: 'USD',
      location: 'Westlands, Nairobi',
      bedrooms: 3,
      bathrooms: 3,
      sizeSqm: 140,
      amenities: [
        'Shopping Mall Access',
        'Restaurants & Cafés',
        'Concierge',
        'Gym',
        'Pool',
        'Security',
        'Parking'
      ],
      images: [
        '/GTC%203.jpeg',
        '/GTC%202.jpeg',
        '/Gtc%201.jpeg'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    },
    {
      title: 'GTC Residence 4 Bedroom Penthouse in Westlands',
      description:
        'Step into the vibrant Westlands neighborhood and experience a lifestyle like no other at GTC Residence Apartments. Positioned among stylish restaurants, cafés, and a modern shopping mall, GTC delivers unmatched comfort, convenience, and elegance for both end users and investors.',
      price: 1130000,
      currency: 'USD',
      location: 'Westlands, Nairobi',
      bedrooms: 4,
      bathrooms: 4,
      sizeSqm: 320,
      amenities: [
        'Shopping Mall Access',
        'Restaurants & Cafés',
        'Concierge',
        'Gym',
        'Pool',
        'Security',
        'Parking'
      ],
      images: [
        '/Gtc%201.jpeg',
        '/GTC%203.jpeg',
        '/GTC%202.jpeg'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    },
    {
      title: '237 Lulu Mini 1 BHK at Garden City',
      description:
        'Welcome to 237 Lulu — the next chapter of living at Garden City, Thika Road, Nairobi. Smart, affordable, and high-yield investment apartments in the heart of Garden City. Choose from Mini 1, 1, 2, and 3 BHK units where quality meets convenience. Pricing and availability: inquire.',
      price: 5900000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 1,
      bathrooms: 1,
      sizeSqm: 0,
      amenities: ['Smart Living', 'Garden City Access', 'Security', 'Parking'],
      images: [
        '/Lulu1.jpeg',
        '/Lulu1.1.jpeg',
        '/Lulu1.2.jpeg'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    },
    {
      title: '237 Lulu 1 BHK at Garden City',
      description:
        'Welcome to 237 Lulu — the next chapter of living at Garden City, Thika Road, Nairobi. Smart, affordable, and high-yield investment apartments in the heart of Garden City. Choose from Mini 1, 1, 2, and 3 BHK units where quality meets convenience. Pricing and availability: inquire.',
      price: 7200000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 1,
      bathrooms: 1,
      sizeSqm: 0,
      amenities: ['Smart Living', 'Garden City Access', 'Security', 'Parking'],
      images: [
        '/Lulu1.1.jpeg',
        '/Lulu1.2.jpeg',
        '/Lulu1.jpeg'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    },
    {
      title: '237 Lulu 2 BHK at Garden City',
      description:
        'Welcome to 237 Lulu — the next chapter of living at Garden City, Thika Road, Nairobi. Smart, affordable, and high-yield investment apartments in the heart of Garden City. Choose from Mini 1, 1, 2, and 3 BHK units where quality meets convenience. Pricing and availability: inquire.',
      price: 9500000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 2,
      bathrooms: 2,
      sizeSqm: 0,
      amenities: ['Smart Living', 'Garden City Access', 'Security', 'Parking'],
      images: [
        '/Lulu1.2.jpeg',
        '/Lulu1.jpeg',
        '/Lulu1.1.jpeg'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    },
    {
      title: '237 Lulu 3 BHK at Garden City',
      description:
        'Welcome to 237 Lulu — the next chapter of living at Garden City, Thika Road, Nairobi. Smart, affordable, and high-yield investment apartments in the heart of Garden City. Choose from Mini 1, 1, 2, and 3 BHK units where quality meets convenience. Pricing and availability: inquire.',
      price: 12500000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 3,
      bathrooms: 2,
      sizeSqm: 0,
      amenities: ['Smart Living', 'Garden City Access', 'Security', 'Parking'],
      images: [
        '/Lulu1.jpeg',
        '/Lulu1.2.jpeg',
        '/Lulu1.1.jpeg'
      ],
      featured: true,
      status: PropertyStatus.AVAILABLE
    }
  ];

  for (const p of items) {
    const slug = slugify(p.title);
    await prisma.property.upsert({
      where: { slug },
      update: {
        ...p
      },
      create: {
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
