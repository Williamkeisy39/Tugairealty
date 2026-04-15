"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PiggyBank, ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How is affordability calculated?',
    a: 'Lenders typically use the 30% rule — your total housing costs (mortgage payment, insurance, taxes) should not exceed 30% of your gross monthly income. Our calculator uses this guideline along with your existing debts to estimate the maximum property price you can afford.'
  },
  {
    q: 'What income is considered for a mortgage in Kenya?',
    a: 'Banks consider your gross monthly salary, allowances, and documented business income. For salaried employees, your payslip and bank statements are the primary documents. Self-employed applicants need audited accounts and tax compliance certificates.'
  },
  {
    q: 'Does my existing debt affect how much I can borrow?',
    a: 'Yes. Banks look at your debt-to-income ratio. Existing car loans, credit card balances, and other obligations reduce the amount you can borrow for a mortgage. Most lenders want your total debt obligations to stay below 40-50% of gross income.'
  },
  {
    q: 'Can two incomes be combined for a mortgage?',
    a: 'Yes. Joint mortgages allow couples or business partners to combine their incomes, significantly increasing borrowing capacity. Both applicants will need to meet the bank\'s credit and documentation requirements.'
  },
  {
    q: 'Should I save for a bigger deposit?',
    a: 'A larger deposit (20%+) typically results in better interest rates, lower monthly payments, and avoids the need for mortgage insurance. It also demonstrates financial discipline to lenders, strengthening your application.'
  }
];

export default function AffordabilityCalculatorPage() {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [existingDebt, setExistingDebt] = useState('');
  const [deposit, setDeposit] = useState('');
  const [interestRate, setInterestRate] = useState('13.5');
  const [loanTerm, setLoanTerm] = useState('20');
  const [result, setResult] = useState<{ maxProperty: number; maxLoan: number; monthlyPayment: number } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function calculate() {
    const income = parseFloat(monthlyIncome);
    const expenses = parseFloat(monthlyExpenses) || 0;
    const debt = parseFloat(existingDebt) || 0;
    const depositAmount = parseFloat(deposit) || 0;
    const rate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);

    if (!income || !rate || !years) return;

    const availableForHousing = income * 0.3;
    const maxMonthlyPayment = Math.max(availableForHousing - debt, 0);

    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;

    const maxLoan = maxMonthlyPayment > 0
      ? (maxMonthlyPayment * (Math.pow(1 + monthlyRate, numPayments) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, numPayments))
      : 0;

    const maxProperty = maxLoan + depositAmount;

    setResult({ maxProperty, maxLoan, monthlyPayment: maxMonthlyPayment });
  }

  return (
    <div>
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=2200&q=80"
          alt="Affordability Calculator"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/55" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-12 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">Financial Tools</p>
          <h1 className="scroll-reveal mt-3 text-3xl font-light text-white sm:text-5xl md:text-6xl">Affordability Calculator</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            Discover how much property you can realistically afford based on your financial profile.
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
              <PiggyBank size={22} className="text-emerald-700" />
              <h2 className="text-2xl text-ink-950">Your Financial Profile</h2>
            </div>

            <div className="space-y-4">
              <label className="block text-xs uppercase tracking-[0.2em] text-ink-500">
                Gross Monthly Income (KES) *
                <Input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="e.g. 300000"
                  className="mt-2"
                />
              </label>
              <label className="block text-xs uppercase tracking-[0.2em] text-ink-500">
                Monthly Expenses (KES)
                <Input
                  type="number"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(e.target.value)}
                  placeholder="e.g. 80000"
                  className="mt-2"
                />
              </label>
              <label className="block text-xs uppercase tracking-[0.2em] text-ink-500">
                Existing Monthly Debt Payments (KES)
                <Input
                  type="number"
                  value={existingDebt}
                  onChange={(e) => setExistingDebt(e.target.value)}
                  placeholder="e.g. 25000"
                  className="mt-2"
                />
              </label>
              <label className="block text-xs uppercase tracking-[0.2em] text-ink-500">
                Available Deposit (KES)
                <Input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  placeholder="e.g. 3000000"
                  className="mt-2"
                />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-xs uppercase tracking-[0.2em] text-ink-500">
                  Interest Rate (%)
                  <Input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="mt-2"
                  />
                </label>
                <label className="block text-xs uppercase tracking-[0.2em] text-ink-500">
                  Loan Term (Years)
                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="mt-2"
                  />
                </label>
              </div>
            </div>

            <Button onClick={calculate} className="w-full">Calculate Affordability</Button>
          </div>

          {result && (
            <div className="card-surface space-y-6 p-8">
              <h3 className="text-xl text-ink-950">What You Can Afford</h3>
              <div className="space-y-4">
                <div className="rounded-2xl bg-emerald-50 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Max Property Price</p>
                  <p className="mt-1 text-3xl font-semibold text-emerald-800">
                    KES {result.maxProperty.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-ink-900/10 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Max Loan Amount</p>
                    <p className="mt-1 text-lg font-semibold text-ink-900">
                      KES {result.maxLoan.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-ink-900/10 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Monthly Payment</p>
                    <p className="mt-1 text-lg font-semibold text-ink-900">
                      KES {result.monthlyPayment.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-500">
                Based on the 30% income rule. Actual lending decisions depend on your full financial profile and the lender&apos;s criteria.
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
          <h2 className="mt-3 text-3xl text-ink-950">Affordability FAQs</h2>
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
