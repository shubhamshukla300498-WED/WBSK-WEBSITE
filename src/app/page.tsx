import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import RecentWeddings from '@/components/RecentWeddings';
import About from '@/components/About';
import Contact from '@/components/Contact';
import {
  client,
  urlFor,
  HOME_PAGE_QUERY,
  PHILOSOPHY_QUERY,
  ABOUT_QUERY,
  CLIENTS_QUERY,
} from '@/lib/sanity';

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  // Fetch all CMS data in parallel — gracefully handle missing data
  let homeData: any = null;
  let philosophyData: any = null;
  let aboutData: any = null;
  let clientsData: any[] = [];

  try {
    [homeData, philosophyData, aboutData, clientsData] = await Promise.all([
      client.fetch(HOME_PAGE_QUERY).catch(() => null),
      client.fetch(PHILOSOPHY_QUERY).catch(() => null),
      client.fetch(ABOUT_QUERY).catch(() => null),
      client.fetch(CLIENTS_QUERY).catch(() => []),
    ]);
  } catch {
    // CMS not connected — components will use fallback data
  }

  const heroImageUrl = homeData?.heroBackgroundImage
    ? urlFor(homeData.heroBackgroundImage).width(1920).url()
    : undefined;

  const aboutBgUrl = aboutData?.backgroundImage
    ? urlFor(aboutData.backgroundImage).width(1920).url()
    : undefined;

  return (
    <>
      {/* ─── HERO ─── */}
      <Hero
        heading={homeData?.heroHeading}
        subtext={homeData?.heroSubtext}
        backgroundImage={heroImageUrl}
        ctaText={homeData?.heroCTAText}
        secondaryText={homeData?.heroSecondaryButtonText}
        categories={homeData?.scrollingCategories}
      />

      {/* ─── PHILOSOPHY + STATS ─── */}
      <Philosophy
        label={philosophyData?.sectionLabel}
        quote={philosophyData?.quote}
        highlight={philosophyData?.quoteHighlight}
        attribution={philosophyData?.attribution}
        stats={homeData?.stats}
      />

      {/* ─── RECENT WEDDINGS ─── */}
      <RecentWeddings clients={clientsData} urlFor={urlFor as any} />

      {/* ─── ABOUT ─── */}
      <About
        heading={aboutData?.heading}
        paragraphs={aboutData?.paragraphs}
        backgroundImage={aboutBgUrl}
      />

      {/* ─── CONTACT ─── */}
      <Contact />
    </>
  );
}
