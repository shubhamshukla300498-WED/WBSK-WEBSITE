'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface GalleryImage {
  url: string;
  caption?: string;
  key: string;
}

interface Video {
  title: string;
  embedUrl: string;
}

interface Props {
  title: string;
  coupleName: string;
  date: string;
  venue: string;
  description: string;
  coverUrl: string;
  gallery: GalleryImage[];
  videos: Video[];
}

export default function ClientGalleryPage({
  title,
  coupleName,
  date,
  venue,
  description,
  coverUrl,
  gallery,
  videos,
}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const formatDate = (d: string) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Hero parallax
      if (heroRef.current) {
        const bg = heroRef.current.querySelector('.client-hero-bg');
        if (bg) {
          gsap.to(bg, {
            yPercent: 25,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }

        // Text reveal
        gsap.from(heroRef.current.querySelector('.client-title'), {
          y: 60, opacity: 0, duration: 1.2, delay: 0.3, ease: 'power3.out',
        });
        gsap.from(heroRef.current.querySelector('.client-couple'), {
          y: 40, opacity: 0, duration: 1, delay: 0.5, ease: 'power3.out',
        });
        gsap.from(heroRef.current.querySelector('.client-meta'), {
          y: 30, opacity: 0, duration: 0.8, delay: 0.7, ease: 'power3.out',
        });
      }

      // Gallery items stagger
      if (galleryRef.current) {
        const items = galleryRef.current.querySelectorAll('.gallery-item');
        gsap.from(items, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }
    };

    loadGsap();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i !== null ? (i + 1) % gallery.length : null));
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i !== null ? (i - 1 + gallery.length) % gallery.length : null));
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, gallery.length]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          {coverUrl ? (
            <div
              className="client-hero-bg absolute inset-[-10%] bg-cover bg-center"
              style={{ backgroundImage: `url(${coverUrl})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-espresso-300 to-espresso-500" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/90 via-espresso-900/40 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 lg:px-16 max-w-7xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="absolute top-28 left-6 lg:left-16 text-cream-200/60 text-xs tracking-ultrawide uppercase font-sans hover:text-gold-400 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1 className="client-title font-display text-4xl lg:text-6xl xl:text-7xl font-bold text-cream-50">
            {title}
          </h1>
          <p className="client-couple text-gold-400 font-body text-xl lg:text-2xl mt-2">
            {coupleName}
          </p>
          <div className="client-meta mt-4 flex flex-wrap items-center gap-6 text-cream-200/60 text-sm font-sans">
            {date && (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(date)}
              </span>
            )}
            {venue && (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {venue}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ─── DESCRIPTION ─── */}
      {description && (
        <section className="py-16 lg:py-20 bg-cream-50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-espresso-500 font-body text-lg lg:text-xl leading-relaxed">
              {description}
            </p>
          </div>
        </section>
      )}

      {/* ─── GALLERY COLLAGE ─── */}
      {gallery.length > 0 && (
        <section className="py-12 lg:py-20 bg-cream-50">
          <div className="max-w-7xl mx-auto px-6">
            <div
              ref={galleryRef}
              className="columns-2 lg:columns-3 gap-4"
            >
              {gallery.map((img, i) => (
                <div
                  key={img.key}
                  className="gallery-item mb-4 break-inside-avoid img-zoom cursor-pointer rounded-lg overflow-hidden"
                  onClick={() => setLightboxIndex(i)}
                  data-cursor-hover
                >
                  <Image
                    src={img.url}
                    alt={img.caption || `${title} photo ${i + 1}`}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── VIDEOS ─── */}
      {videos.length > 0 && (
        <section className="py-16 lg:py-24 bg-espresso-900">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-cream-50 text-center mb-12">
              Wedding Films
            </h2>
            <div className="space-y-10">
              {videos.map((vid, i) => (
                <div key={i}>
                  {vid.title && (
                    <h3 className="text-cream-200/70 font-body text-lg mb-4 text-center">
                      {vid.title}
                    </h3>
                  )}
                  <div className="video-wrapper shadow-2xl">
                    <iframe
                      src={vid.embedUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={vid.title || `Video ${i + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-24 bg-cream-50 text-center">
        <p className="text-[10px] tracking-ultrawide uppercase text-gold-500 font-sans mb-3">
          Loved what you saw?
        </p>
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-espresso-800 mb-6">
          Let&apos;s Create Your Story
        </h2>
        <a href="/#contact" className="btn-primary">
          <span>Book Your Session</span>
        </a>
      </section>

      {/* ─── LIGHTBOX ─── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-espresso-900/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-cream-50/70 hover:text-cream-50 z-10"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-50/60 hover:text-cream-50 z-10"
            aria-label="Previous"
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallery[lightboxIndex].url}
              alt={gallery[lightboxIndex].caption || ''}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto object-contain"
              priority
            />
            {gallery[lightboxIndex].caption && (
              <p className="absolute bottom-0 left-0 right-0 p-4 bg-espresso-900/80 text-cream-50 text-sm font-body text-center">
                {gallery[lightboxIndex].caption}
              </p>
            )}
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % gallery.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-50/60 hover:text-cream-50 z-10"
            aria-label="Next"
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream-200/50 text-xs font-sans tracking-wider">
            {lightboxIndex + 1} / {gallery.length}
          </p>
        </div>
      )}
    </>
  );
}
