import Image from 'next/image';

export default function PrivacyPage() {
  return (
    <div>
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=2200&q=80"
          alt="Privacy Policy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-24 pb-12 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">Legal</p>
          <h1 className="scroll-reveal mt-3 text-5xl font-light text-white md:text-6xl">Privacy Policy</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            How Tugai Realtors collects, uses, and protects your personal information.
          </p>
        </div>
      </section>

      <div className="relative pb-20 pt-12">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2200&q=60"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 border border-white/30 bg-white/30 backdrop-blur-md backdrop-saturate-150" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6">
      <div className="mt-8 space-y-6 text-sm leading-7 text-ink-700">
        <p><strong className="text-ink-900">Effective Date:</strong> January 1, 2024</p>

        <h2 className="text-lg font-semibold text-ink-900">1. Information We Collect</h2>
        <p>When you use our website, submit forms, or contact us, we may collect: your name, email address, phone number, property preferences, financial information provided through calculators, and usage data (cookies, IP address, browser type).</p>

        <h2 className="text-lg font-semibold text-ink-900">2. How We Use Your Information</h2>
        <p>We use your information to: respond to inquiries, match you with suitable properties, improve our services, send relevant updates (with your consent), and comply with legal obligations.</p>

        <h2 className="text-lg font-semibold text-ink-900">3. Data Sharing</h2>
        <p>We do not sell your personal data. We may share information with: property developers (when you express interest in a listing), legal and financial partners involved in transactions, and service providers who help operate our website.</p>

        <h2 className="text-lg font-semibold text-ink-900">4. Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information, including encrypted data transmission (SSL), secure database storage, and restricted staff access.</p>

        <h2 className="text-lg font-semibold text-ink-900">5. Cookies</h2>
        <p>Our website uses cookies to improve your browsing experience, analyse traffic, and personalise content. You can control cookie settings through your browser preferences.</p>

        <h2 className="text-lg font-semibold text-ink-900">6. Your Rights</h2>
        <p>You have the right to: access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, and withdraw consent for marketing communications at any time.</p>

        <h2 className="text-lg font-semibold text-ink-900">7. Data Retention</h2>
        <p>We retain personal data for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Inquiry data is typically retained for 24 months.</p>

        <h2 className="text-lg font-semibold text-ink-900">8. Third-Party Services</h2>
        <p>Our website may integrate with third-party services (e.g., WhatsApp, YouTube, analytics). These services have their own privacy policies, and we encourage you to review them.</p>

        <h2 className="text-lg font-semibold text-ink-900">9. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. The updated version will be posted on this page with the revised effective date.</p>

        <h2 className="text-lg font-semibold text-ink-900">10. Contact</h2>
        <p>For privacy-related inquiries, contact us at <a href="mailto:hello@tugairealtors.com" className="text-emerald-700 hover:underline">hello@tugairealtors.com</a> or call +254 712 470341.</p>
      </div>
      </div>
      </div>
    </div>
  );
}
