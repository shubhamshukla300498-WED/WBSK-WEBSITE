'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ClientCard } from '@/lib/types';

// Fallback demo data when CMS is not connected
const DEMO_CLIENTS: ClientCard[] = [
  {
    _id: '1',
    title: 'Garden Romance',
    slug: { current: 'garden-romance' },
    coupleName: 'Garhima & Ankur',
    date: '2025-02-08',
    venue: 'Sanskriti Greens, Faridabad',
    description: 'A dreamy garden wedding filled with natural beauty and romantic moments.',
    coverImage: { _type: 'image', asset: { _ref: '' } },
    category: { title: 'Luxury' },
  },
  {
    _id: '2',
    title: 'Cultural Celebration',
    slug: { current: 'cultural-celebration' },
    coupleName: 'Ayushi & Kunal',
    date: '2025-02-14',
    venue: 'Mishtten Club, Kota',
    description: 'A vibrant celebration of love, tradition, and cultural heritage.',
    coverImage: { _type: 'image', asset: { _ref: '' } },
    category: { title: 'Traditional' },
  },
  {
    _id: '3',
    title: 'Seaside Elegance',
    slug: { current: 'seaside-elegance' },
    coupleName: 'Anusha & Rohit',
    date: '2025-03-29',
    venue: 'La Cabana, Goa',
    description: 'An elegant beachside ceremony with stunning ocean views.',
    coverImage: { _type: 'image', asset: { _ref: '' } },
    category: { title: 'Destination' },
  },
  {
    _id: '4',
    title: 'Mountain Bliss',
    slug: { current: 'mountain-bliss' },
    coupleName: 'Anukriti & Gaurav',
    date: '2025-03-03',
    venue: 'Evara Resort, Corbett',
    description: 'A breathtaking mountain wedding surrounded by nature\'s grandeur.',
    coverImage: { _type: 'image', asset: { _ref: '' } },
    category: { title: 'Destination' },
  },
];

interface RecentWeddingsProps {
  clients?: ClientCard[];
  urlFor?: (source: any) => { width: (w: number) => { height: (h: number) => { url: () => string } } };
}

export default function RecentWeddings({ clients, urlFor }: RecentWeddingsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const displayClients = clients?.length ? clients : DEMO_CLIENTS;

  // Double the list for infinite scroll illusion
  const doubled = [...displayClients, ...displayClients];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Section heading reveal
      gsap.from(el.querySelector('.weddings-heading'), {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });

      gsap.from(el.querySelector('.weddings-subtext'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
        delay: 0.2,
      });
    };

    loadGsap();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getImageUrl = (client: ClientCard) => {
    if (urlFor && client.coverImage?.asset?._ref) {
      return urlFor(client.coverImage).width(600).height(750).url();
    }
    // Placeholder gradient
    return '';
  };

  return (
    <section ref={sectionRef} id="weddings" className="py-24 lg:py-36 bg-cream-50">
      {/* Heading */}
      <div className="text-center px-6 mb-16">
        <h2 className="weddings-heading font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-espresso-800">
          Recent Weddings
        </h2>
        <p className="weddings-subtext mt-4 text-espresso-400 font-body text-lg lg:text-xl max-w-xl mx-auto">
          Each wedding is a unique story waiting to be told.
          <br />
          Explore our recent celebrations of love.
        </p>
      </div>

      {/* Infinite Scroll Track */}
      <div className="overflow-hidden">
        <div
          ref={scrollTrackRef}
          className="flex gap-6 px-6 animate-marquee hover:[animation-play-state:paused]"
          style={{
            width: 'max-content',
          }}
        >
          {doubled.map((client, i) => (
            <Link
              key={`${client._id}-${i}`}
              href={`/client/${client.slug.current}`}
              className="group flex-shrink-0 w-[300px] lg:w-[340px]"
              data-cursor-hover
            >
              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
                {/* Image */}
                <div className="img-zoom aspect-[4/5] relative bg-espresso-100">
                  {getImageUrl(client) ? (
                    <Image
                      src={getImageUrl(client)}
                      alt={client.title}
                      fill
                      className="object-cover"
                      sizes="340px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-espresso-200 to-espresso-300 flex items-center justify-center">
                      <span className="text-espresso-400 font-display text-xl">
                        {client.coupleName}
                      </span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-espresso-900/0 group-hover:bg-espresso-900/30 transition-all duration-500 flex items-center justify-center">
                    <span className="text-cream-50 text-xs tracking-ultrawide uppercase font-sans opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      View Gallery →
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-espresso-800">
                    {client.title}
                  </h3>
                  <p className="text-gold-500 font-body text-base mt-1">
                    {client.coupleName}
                  </p>

                  <div className="mt-3 flex items-center gap-4 text-espresso-400">
                    <span className="flex items-center gap-1.5 text-xs font-sans">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(client.date)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-xs font-sans text-espresso-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {client.venue}
                  </div>

                  <p className="mt-3 text-sm text-espresso-500 font-body leading-relaxed line-clamp-2">
                    {client.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
