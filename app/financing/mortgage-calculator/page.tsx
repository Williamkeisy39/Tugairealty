"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator, ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is the typical mortgage interest rate in Kenya?',
    a: 'Most Kenyan banks offer mortgage rates between 12% and 16% per annum. Rates vary based on the lender, loan amount, and your credit profile. Some banks offer fixed rates for the first few years before switching to variable rates.'
  },
  {
    q: 'What is the maximum loan tenure in Kenya?',
    a: 'Most banks offer mortgages with tenures of up to 25 years, though 15-20 years is the most common. Longer tenures reduce monthly payments but increase total interest paid.'
  },
  {
    q: 'How much deposit do I need for a mortgage in Kenya?',
    a: 'Typically, you need a deposit of 10-20% of the property value. Some lenders may accept as low as 10% for salaried employees with strong credit histories, while self-employed borrowers may need 20-30%.'
  },
  {
    q: 'Can diaspora Kenyans get mortgages?',
    a: 'Yes. Several Kenyan banks including KCB, Equity Bank, and Stanbic have diaspora mortgage products. You can apply remotely, though you may need a local representative and additional documentation.'
  },
  {
    q: 'What additional costs should I budget for beyond the mortgage?',
    a: 'Plan for stamp duty (2-4% of property value), legal fees (1-2%), valuation fees, insurance premiums, and bank processing fees (typically 1-2.5% of the loan amount).'
  }
];

export default function MortgageCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [result, setResult] = useState<{ monthly: number; totalInterest: number; totalPayment: number } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function calculate() {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);

    if (!principal || !annualRate || !years) return;

    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPayment = monthly * numPayments;
    const totalInterest = totalPayment - principal;

    setResult({ monthly, totalInterest, totalPayment });
  }

  return (
    <div>
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2200&q=80"
          alt="Mortgage Calculator"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/55" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-12 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">Financial Tools</p>
          <h1 className="scroll-reveal mt-3 text-3xl font-light text-white sm:text-5xl md:text-6xl">Mortgage Calculator</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            Estimate your monthly mortgage payments and plan your property purchase with clarity.
          </p>
        </div>
      </section>

      <div className="relative pb-20 pt-12">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2200&q=60"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 border border-white/30 bg-white/30 backdrop-blur-md backdrop-saturate-150" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="card-surface space-y-6 p-8">
            <div className="flex items-center gap-3">
              <Calculator size={22} className="text-emerald-700" />
              <h2 className="text-2xl text-ink-950">Calculate Your Payment</h2>
            </div>

            <div className="space-y-4">
              <label className="block text-xs uppercase tracking-[0.2em] text-ink-500">
                Loan Amount (KES) *
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="e.g. 15000000"
                  className="mt-2"
                />
              </label>
              <label className="block text-xs uppercase tracking-[0.2em] text-ink-500">
                Annual Interest Rate (%) *
                <Input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="e.g. 13.5"
                  className="mt-2"
                />
              </label>
              <label className="block text-xs uppercase tracking-[0.2em] text-ink-500">
                Loan Term (Years) *
                <Input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="e.g. 20"
                  className="mt-2"
                />
              </label>
            </div>

            <Button onClick={calculate} className="w-full">Calculate</Button>
          </div>

          {result && (
            <div className="card-surface space-y-6 p-8">
              <h3 className="text-xl text-ink-950">Your Estimate</h3>
              <div className="space-y-4">
                <div className="rounded-2xl bg-emerald-50 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Monthly Payment</p>
                  <p className="mt-1 text-3xl font-semibold text-emerald-800">
                    KES {result.monthly.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-ink-900/10 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Total Interest</p>
                    <p className="mt-1 text-lg font-semibold text-ink-900">
                      KES {result.totalInterest.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-ink-900/10 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Total Payment</p>
                    <p className="mt-1 text-lg font-semibold text-ink-900">
                      KES {result.totalPayment.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-500">
                This is an estimate only. Actual payments may vary based on lender terms, fees, and insurance requirements.
              </p>
              <Link
                href="/contact"
                className="block rounded-full bg-[#145b36] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-0.5 hover:bg-[#114b2d]"
              >
                Speak to an Advisor
              </Link>
            </div>
          )}
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-700">Common Questions</p>
          <h2 className="mt-3 text-3xl text-ink-950">Mortgage FAQs</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card-surface overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-ink-900"
                >
                  {faq.q}
                  <ChevronDown size={18} className={`shrink-0 text-ink-500 transition ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-ink-900/5 px-6 py-4 text-sm text-ink-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
