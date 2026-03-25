'use client';

import { useState, useRef, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(el.querySelector('.contact-heading'), {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });

      gsap.from(el.querySelector('.contact-form'), {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
        delay: 0.3,
      });
    };

    loadGsap();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 lg:py-36 bg-espresso-900 text-cream-50 relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-400/5 rounded-full blur-[100px]" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center">
          <p className="text-[10px] tracking-ultrawide uppercase text-gold-400 font-sans mb-4">
            Get in Touch
          </p>
          <h2 className="contact-heading font-display text-4xl lg:text-5xl font-bold">
            Let&apos;s Create Something
            <br />
            <span className="italic text-gold-400">Beautiful</span> Together
          </h2>
          <p className="mt-4 text-cream-200/60 font-body text-lg">
            Ready to preserve your special moments? We&apos;d love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form mt-12 space-y-6">
          <div>
            <label className="block text-[10px] tracking-ultrawide uppercase text-cream-200/40 font-sans mb-2">
              Your Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b border-cream-200/20 py-3 text-cream-50 font-body text-lg focus:outline-none focus:border-gold-400 transition-colors placeholder:text-cream-200/20"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-ultrawide uppercase text-cream-200/40 font-sans mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-transparent border-b border-cream-200/20 py-3 text-cream-50 font-body text-lg focus:outline-none focus:border-gold-400 transition-colors placeholder:text-cream-200/20"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-ultrawide uppercase text-cream-200/40 font-sans mb-2">
              Your Message
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-transparent border-b border-cream-200/20 py-3 text-cream-50 font-body text-lg focus:outline-none focus:border-gold-400 transition-colors resize-none placeholder:text-cream-200/20"
              placeholder="Tell us about your wedding..."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-gold-500 text-espresso-900 font-sans text-sm tracking-ultrawide uppercase font-medium hover:bg-gold-400 transition-colors duration-300 disabled:opacity-50"
            >
              {status === 'sending'
                ? 'Sending...'
                : status === 'sent'
                ? 'Message Sent ✓'
                : 'Send Message'}
            </button>
          </div>

          {status === 'error' && (
            <p className="text-red-400 text-sm text-center font-sans">
              Something went wrong. Please try again or email us directly.
            </p>
          )}
          {status === 'sent' && (
            <p className="text-gold-400 text-sm text-center font-sans">
              Thank you! We&apos;ll get back to you within 24 hours.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
