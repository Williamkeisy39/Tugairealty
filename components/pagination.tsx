import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationProps {
  page: number;
  totalPages: number;
  searchParams: URLSearchParams;
}

export default function Pagination({ page, totalPages, searchParams }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2 text-sm">
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1;
        const params = new URLSearchParams(searchParams);
        params.set('page', String(pageNumber));
        return (
          <Link
            key={pageNumber}
            href={`?${params.toString()}`}
            className={cn(
              'rounded-full border border-ink-900/10 px-4 py-2 transition hover:border-ink-900',
              page === pageNumber && 'bg-ink-900 text-white'
            )}
          >
            {pageNumber}
          </Link>
        );
      })}
    </div>
  );
}
