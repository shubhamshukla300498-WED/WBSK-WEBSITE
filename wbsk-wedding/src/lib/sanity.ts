import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── QUERIES ───

export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  heroHeading,
  heroSubtext,
  heroBackgroundImage,
  heroCTAText,
  heroSecondaryButtonText,
  scrollingCategories,
  stats
}`;

export const PHILOSOPHY_QUERY = `*[_type == "philosophy"][0]{
  sectionLabel,
  quote,
  quoteHighlight,
  attribution
}`;

export const ABOUT_QUERY = `*[_type == "about"][0]{
  heading,
  paragraphs,
  backgroundImage
}`;

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  logo,
  navLinks,
  phone,
  email,
  instagram,
  youtube,
  footerText
}`;

export const CLIENTS_QUERY = `*[_type == "client" && featured == true] | order(order asc){
  _id,
  title,
  slug,
  coupleName,
  date,
  venue,
  description,
  coverImage,
  category->{title}
}`;

export const CLIENT_DETAIL_QUERY = `*[_type == "client" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  coupleName,
  date,
  venue,
  description,
  longDescription,
  coverImage,
  gallery[]{
    _key,
    asset->{_id, url},
    caption,
    hotspot
  },
  videos,
  category->{title}
}`;

export const ALL_CLIENT_SLUGS = `*[_type == "client" && defined(slug.current)]{
  "slug": slug.current
}`;
