import Image from 'next/image';

export default function TermsPage() {
  return (
    <div>
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2200&q=80"
          alt="Terms and Conditions"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/45" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-12 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">Legal</p>
          <h1 className="scroll-reveal mt-3 text-3xl font-light text-white sm:text-5xl md:text-6xl">Terms &amp; Conditions</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            Please read these terms carefully before using the Tugai Realtors website.
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

        <h2 className="text-lg font-semibold text-ink-900">1. Acceptance of Terms</h2>
        <p>By accessing and using the Tugai Realtors website (tugairealtors.com), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the website.</p>

        <h2 className="text-lg font-semibold text-ink-900">2. Services</h2>
        <p>Tugai Realtors provides real estate advisory, property listing, and property management services. All listings and information on this website are for informational purposes only and do not constitute an offer or contract.</p>

        <h2 className="text-lg font-semibold text-ink-900">3. Property Listings</h2>
        <p>While we strive to ensure accuracy, Tugai Realtors does not guarantee the completeness or accuracy of property listings, prices, availability, or descriptions. All properties are subject to prior sale, withdrawal, or price change without notice.</p>

        <h2 className="text-lg font-semibold text-ink-900">4. User Conduct</h2>
        <p>You agree not to use the website for any unlawful purpose, to submit false or misleading information, or to interfere with the operation of the website.</p>

        <h2 className="text-lg font-semibold text-ink-900">5. Intellectual Property</h2>
        <p>All content on this website — including text, images, logos, and design — is the property of Tugai Realtors and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without written permission.</p>

        <h2 className="text-lg font-semibold text-ink-900">6. Financial Tools</h2>
        <p>The mortgage and affordability calculators are provided for estimation purposes only. Results are not financial advice and should not be relied upon for making financial decisions. Consult a licensed financial advisor before making commitments.</p>

        <h2 className="text-lg font-semibold text-ink-900">7. Limitation of Liability</h2>
        <p>Tugai Realtors shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the website or reliance on any information provided.</p>

        <h2 className="text-lg font-semibold text-ink-900">8. Third-Party Links</h2>
        <p>This website may contain links to third-party websites. Tugai Realtors is not responsible for the content, privacy practices, or accuracy of external sites.</p>

        <h2 className="text-lg font-semibold text-ink-900">9. Modifications</h2>
        <p>We reserve the right to update these Terms at any time. Continued use of the website after changes constitutes acceptance of the updated Terms.</p>

        <h2 className="text-lg font-semibold text-ink-900">10. Governing Law</h2>
        <p>These Terms are governed by the laws of the Republic of Kenya. Any disputes shall be subject to the exclusive jurisdiction of the courts of Kenya.</p>

        <h2 className="text-lg font-semibold text-ink-900">11. Contact</h2>
        <p>For questions about these Terms, contact us at <a href="mailto:info@tugairealtors.com" className="text-emerald-700 hover:underline">info@tugairealtors.com</a>.</p>
      </div>
      </div>
      </div>
    </div>
  );
}
