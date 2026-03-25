'use client';

import { useEffect, useRef } from 'react';

interface AboutProps {
  heading?: string;
  paragraphs?: string[];
  backgroundImage?: string;
}

export default function About({
  heading = 'About Weddings by Siddhant Kapoor',
  paragraphs = [
    "Hi, I'm Siddhant Kapoor, a passionate wedding photographer dedicated to capturing the magic of your special day. With years of experience in wedding photography, I specialize in creating timeless, elegant imagery that reflects the unique love story of each couple I work with.",
    'From intimate ceremonies to grand celebrations, I believe every wedding is unique and deserves to be captured with artistic vision and attention to detail. Let me help you preserve the authentic emotions, beautiful moments, and precious memories that make your wedding day truly unforgettable.',
  ],
  backgroundImage,
}: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Parallax background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Text reveal
      gsap.from(el.querySelector('.about-heading'), {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      });

      const paras = el.querySelectorAll('.about-paragraph');
      gsap.from(paras, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 65%', once: true },
        delay: 0.3,
      });
    };

    loadGsap();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 lg:py-44 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          ref={bgRef}
          className="absolute inset-[-10%] bg-cover bg-center"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : `linear-gradient(135deg, #EDE0C4 0%, #D4C5A0 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-cream-50/85 backdrop-blur-sm" />
        {/* Decorative mesh pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1A130C 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="about-heading font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-espresso-800 leading-tight">
          {heading}
        </h2>

        <div className="mt-10 space-y-6">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="about-paragraph text-espresso-500 font-body text-lg lg:text-xl leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a href="#contact" className="btn-primary">
            <span>Get in Touch</span>
          </a>
        </div>
      </div>
    </section>
  );
}
