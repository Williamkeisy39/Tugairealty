'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sand-50 px-6 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl font-semibold text-ink-900">Something went wrong</h1>
        <p className="text-lg text-ink-600">
          We&apos;re having trouble loading this page right now. Please try again in a moment.
        </p>
        {error.digest && (
          <p className="text-xs uppercase tracking-[0.2em] text-ink-400">
            Reference: {error.digest}
          </p>
        )}
        <div className="flex justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-full bg-[#145b36] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#114b2d]"
          >
            Try Again
          </button>
          <a
            href="/"
            className="rounded-full border border-ink-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink-900 transition hover:bg-ink-900 hover:text-white"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
