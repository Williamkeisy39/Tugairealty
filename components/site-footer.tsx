import Image from 'next/image';

export default function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-white/40 bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-ink-700 md:flex-row md:items-center md:justify-between">
        <div>
          <Image src="/tugss.png" alt="Tugai Realtors" width={210} height={60} className="h-10 w-auto" />
        </div>
        <div className="flex flex-col gap-1 text-right text-ink-600">
          <a href="mailto:hello@tugai.africa" className="hover:text-ink-900">
            hello@tugai.africa
          </a>
          <a href="tel:+254712470341" className="hover:text-ink-900">
            +254 712 470341
          </a>
        </div>
      </div>
    </footer>
  );
}
