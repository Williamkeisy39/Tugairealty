import { MessageCircle } from 'lucide-react';

const normalizedNumber = '254712470341';
const defaultMessage =
  "Hi Tugai Realtors, I'm interested in one of your listings. Please share available options and next steps.";
const link = normalizedNumber ? `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(defaultMessage)}` : undefined;

export default function FloatingWhatsapp() {
  if (!link) return null;

  return (
    <a
      href={`${link}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-white shadow-lg transition hover:translate-y-[-2px]"
    >
      <MessageCircle size={18} />
      WhatsApp
    </a>
  );
}
