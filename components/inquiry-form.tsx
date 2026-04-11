"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface InquiryFormProps {
  propertyId: string;
}

export default function InquiryForm({ propertyId }: InquiryFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    setSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, propertyId })
      });

      if (!res.ok) {
        throw new Error('Unable to submit inquiry.');
      }

      event.currentTarget.reset();
      router.refresh();
      toast.success('Inquiry sent. Our advisor will respond shortly.');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-4 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-ink-600">Interested?</p>
        <h3 className="mt-2 text-2xl text-ink-950">Arrange a private viewing</h3>
        <p className="text-sm text-ink-600">Share your details and our advisory team will reach out.</p>
      </div>
      <div className="space-y-4">
        <Input name="name" placeholder="Full Name" required />
        <Input type="email" name="email" placeholder="Email" required />
        <Input type="tel" name="phone" placeholder="Phone" />
        <Textarea name="message" placeholder="Tell us about your requirements" required rows={4} />
      </div>
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send Inquiry'}
      </Button>
    </form>
  );
}
