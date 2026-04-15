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
      title: 'Amaiya 1 Bedroom Apartment at Garden City',
      description:
        'Amaiya by Mi Vida Homes within Garden City Mall offers modern one-bedroom living with abundant natural light, contemporary layouts, and balcony views. Ideal for investors or homeowners seeking lifestyle convenience along Thika Road. From KES 8.5M.',
      price: 8500000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 1,
      bathrooms: 1,
      sizeSqm: 55,
      amenities: [
        'Semi-Olympic heated swimming pool (one of the largest in Nairobi)',
        'Fully equipped residents-only gym',
        'Expansive clubhouse with BBQ deck',
        'Multi-purpose sports court',
        'Outdoor & Green Living',
        '1-acre landscaped park with botanical gardens',
        'Private 300m jogging & walking track',
        'Beautifully landscaped green spaces for relaxation',
        'Outdoor seating and nature-inspired spaces',
        'Family-Friendly Amenities',
        'Dedicated children’s play area',
        'Recreation park for families',
        'Safe, secure community environment'
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
        'Amaiya by Mi Vida Homes within Garden City Mall offers modern one-bedroom duplex living with double-volume spaces, refined finishes, and balcony views. Ideal for investors or homeowners seeking lifestyle convenience along Thika Road. From KES 10M.',
      price: 10000000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 1,
      bathrooms: 2,
      sizeSqm: 73,
      amenities: [
        'Semi-Olympic heated swimming pool (one of the largest in Nairobi)',
        'Fully equipped residents-only gym',
        'Expansive clubhouse with BBQ deck',
        'Multi-purpose sports court',
        'Outdoor & Green Living',
        '1-acre landscaped park with botanical gardens',
        'Private 300m jogging & walking track',
        'Beautifully landscaped green spaces for relaxation',
        'Outdoor seating and nature-inspired spaces',
        'Family-Friendly Amenities',
        'Dedicated children’s play area',
        'Recreation park for families',
        'Safe, secure community environment'
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
        'Amaiya by Mi Vida Homes within Garden City Mall offers modern two-bedroom duplex living with spacious layouts, natural lighting, and private balconies. Ideal for investors or homeowners seeking lifestyle convenience along Thika Road. From KES 15.5M.',
      price: 15500000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 2,
      bathrooms: 2,
      sizeSqm: 110,
      amenities: [
        'Semi-Olympic heated swimming pool (one of the largest in Nairobi)',
        'Fully equipped residents-only gym',
        'Expansive clubhouse with BBQ deck',
        'Multi-purpose sports court',
        'Outdoor & Green Living',
        '1-acre landscaped park with botanical gardens',
        'Private 300m jogging & walking track',
        'Beautifully landscaped green spaces for relaxation',
        'Outdoor seating and nature-inspired spaces',
        'Family-Friendly Amenities',
        'Dedicated children’s play area',
        'Recreation park for families',
        'Safe, secure community environment'
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
        'Amaiya by Mi Vida Homes within Garden City Mall offers modern three-bedroom apartments with expansive layouts, generous light, and balcony views. Ideal for families seeking lifestyle convenience along Thika Road. From KES 17.5M.',
      price: 17500000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 3,
      bathrooms: 2,
      sizeSqm: 122,
      amenities: [
        'Semi-Olympic heated swimming pool (one of the largest in Nairobi)',
        'Fully equipped residents-only gym',
        'Expansive clubhouse with BBQ deck',
        'Multi-purpose sports court',
        'Outdoor & Green Living',
        '1-acre landscaped park with botanical gardens',
        'Private 300m jogging & walking track',
        'Beautifully landscaped green spaces for relaxation',
        'Outdoor seating and nature-inspired spaces',
        'Family-Friendly Amenities',
        'Dedicated children’s play area',
        'Recreation park for families',
        'Safe, secure community environment'
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
        'Step into the vibrant Westlands neighborhood and experience a lifestyle like no other at GTC Residence Apartments. Positioned among stylish restaurants, cafés, and a modern shopping mall, GTC delivers unmatched comfort, convenience, and elegance for both end users and investors. From USD 222K.',
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
        'Step into the vibrant Westlands neighborhood and experience a lifestyle like no other at GTC Residence Apartments. Positioned among stylish restaurants, cafés, and a modern shopping mall, GTC delivers unmatched comfort, convenience, and elegance for both end users and investors. From USD 278K.',
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
        'Step into the vibrant Westlands neighborhood and experience a lifestyle like no other at GTC Residence Apartments. Positioned among stylish restaurants, cafés, and a modern shopping mall, GTC delivers unmatched comfort, convenience, and elegance for both end users and investors. From USD 347K.',
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
        'Step into the vibrant Westlands neighborhood and experience a lifestyle like no other at GTC Residence Apartments. Positioned among stylish restaurants, cafés, and a modern shopping mall, GTC delivers unmatched comfort, convenience, and elegance for both end users and investors. From USD 1.13M.',
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
        'Welcome to 237 Lulu — the next chapter of living at Garden City, Thika Road, Nairobi. Smart, affordable, and high-yield investment apartments in the heart of Garden City. Choose from Mini 1, 1, 2, and 3 BHK units where quality meets convenience. From KES 4.4M.',
      price: 4400000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 1,
      bathrooms: 1,
      sizeSqm: 41,
      amenities: [
        'Fully equipped gym & fitness center',
        'Central clubhouse (with social and relaxation spaces)',
        'Co-working spaces (ideal for remote work & professionals)',
        'Two swimming pools (family & leisure)',
        'Landscaped gardens & outdoor lounges',
        'Jogging and cycling tracks',
        'Dedicated children’s play areas'
      ],
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
        'Welcome to 237 Lulu — the next chapter of living at Garden City, Thika Road, Nairobi. Smart, affordable, and high-yield investment apartments in the heart of Garden City. Choose from Mini 1, 1, 2, and 3 BHK units where quality meets convenience. From KES 5.7M.',
      price: 5700000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 1,
      bathrooms: 1,
      sizeSqm: 50,
      amenities: [
        'Fully equipped gym & fitness center',
        'Central clubhouse (with social and relaxation spaces)',
        'Co-working spaces (ideal for remote work & professionals)',
        'Two swimming pools (family & leisure)',
        'Landscaped gardens & outdoor lounges',
        'Jogging and cycling tracks',
        'Dedicated children’s play areas'
      ],
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
        'Welcome to 237 Lulu — the next chapter of living at Garden City, Thika Road, Nairobi. Smart, affordable, and high-yield investment apartments in the heart of Garden City. Choose from Mini 1, 1, 2, and 3 BHK units where quality meets convenience. From KES 7.65M.',
      price: 7650000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 2,
      bathrooms: 2,
      sizeSqm: 73,
      amenities: [
        'Fully equipped gym & fitness center',
        'Central clubhouse (with social and relaxation spaces)',
        'Co-working spaces (ideal for remote work & professionals)',
        'Two swimming pools (family & leisure)',
        'Landscaped gardens & outdoor lounges',
        'Jogging and cycling tracks',
        'Dedicated children’s play areas'
      ],
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
        'Welcome to 237 Lulu — the next chapter of living at Garden City, Thika Road, Nairobi. Smart, affordable, and high-yield investment apartments in the heart of Garden City. Choose from Mini 1, 1, 2, and 3 BHK units where quality meets convenience. From KES 10.7M.',
      price: 10700000,
      currency: 'KES',
      location: 'Garden City, Thika Road, Nairobi',
      bedrooms: 3,
      bathrooms: 2,
      sizeSqm: 102,
      amenities: [
        'Fully equipped gym & fitness center',
        'Central clubhouse (with social and relaxation spaces)',
        'Co-working spaces (ideal for remote work & professionals)',
        'Two swimming pools (family & leisure)',
        'Landscaped gardens & outdoor lounges',
        'Jogging and cycling tracks',
        'Dedicated children’s play areas'
      ],
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
