'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook: Scroll-triggered reveal animation using GSAP
 */
export function useGsapReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const children = el.querySelectorAll('[data-reveal]');

      children.forEach((child, i) => {
        const direction = (child as HTMLElement).dataset.reveal || 'up';
        const delay = parseFloat((child as HTMLElement).dataset.revealDelay || '0');

        const from: any = { opacity: 0, duration: 1, ease: 'power3.out', delay };

        if (direction === 'up') from.y = 60;
        if (direction === 'down') from.y = -60;
        if (direction === 'left') from.x = -80;
        if (direction === 'right') from.x = 80;
        if (direction === 'scale') { from.scale = 0.9; from.y = 30; }

        gsap.from(child, {
          ...from,
          scrollTrigger: {
            trigger: child,
            start: 'top 85%',
            once: true,
          },
        });
      });
    };

    loadGsap();
  }, []);

  return ref;
}

/**
 * Hook: Parallax background on scroll
 */
export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    };

    loadGsap();
  }, [speed]);

  return ref;
}

/**
 * Hook: Counter animation for statistics
 */
export function useCountUp(target: number, suffix: string = '') {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.floor(obj.val) + suffix;
        },
      });
    };

    loadGsap();
  }, [target, suffix]);

  return ref;
}

/**
 * Hook: Stagger children on scroll
 */
export function useStaggerReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const items = el.querySelectorAll('[data-stagger]');

      gsap.from(items, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      });
    };

    loadGsap();
  }, []);

  return ref;
}

/**
 * Hook: Mouse parallax effect for hero
 */
export function useMouseParallax(intensity: number = 0.02) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    if ('ontouchstart' in window) return;

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * intensity;
      const y = (e.clientY - window.innerHeight / 2) * intensity;
      el.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [intensity]);

  return ref;
}
