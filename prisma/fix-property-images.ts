import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function isRemoteUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

function isLocalPath(value: string) {
  return value.startsWith('/') && /\.[a-zA-Z]{2,5}(\?|$)/.test(value);
}

function sanitizeImages(images: string[]) {
  const cleaned: string[] = [];
  let index = 0;

  while (index < images.length) {
    const raw = (images[index] || '').trim();
    if (!raw) {
      index += 1;
      continue;
    }

    if (raw.startsWith('data:')) {
      if (raw.includes('base64,')) {
        cleaned.push(raw);
        index += 1;
        continue;
      }

      const next = images[index + 1];
      if (next) {
        cleaned.push(`${raw},${next.trim()}`);
        index += 2;
        continue;
      }

      cleaned.push(raw);
      index += 1;
      continue;
    }

    if (isRemoteUrl(raw) || isLocalPath(raw)) {
      cleaned.push(raw);
    }

    index += 1;
  }

  return Array.from(new Set(cleaned));
}

async function main() {
  const properties = await prisma.property.findMany({
    select: { id: true, title: true, images: true }
  });

  for (const property of properties) {
    const fixed = sanitizeImages(property.images);
    if (fixed.join('|') !== property.images.join('|')) {
      await prisma.property.update({
        where: { id: property.id },
        data: { images: fixed }
      });
      console.log(`Updated images for: ${property.title}`);
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
