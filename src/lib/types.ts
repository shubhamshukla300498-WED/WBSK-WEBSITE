// ─── Sanity Image Reference ───
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
  hotspot?: {
    x: number;
    y: number;
  };
}

// ─── Site Settings ───
export interface SiteSettings {
  siteName: string;
  tagline: string;
  logo?: SanityImage;
  navLinks?: { label: string; href: string }[];
  phone?: string;
  email?: string;
  instagram?: string;
  youtube?: string;
  footerText?: string;
}

// ─── Home Page ───
export interface HomePage {
  heroHeading: string;
  heroSubtext: string;
  heroBackgroundImage?: SanityImage;
  heroCTAText: string;
  heroSecondaryButtonText: string;
  scrollingCategories?: string[];
  stats?: { number: string; label: string }[];
}

// ─── Philosophy ───
export interface Philosophy {
  sectionLabel: string;
  quote: string;
  quoteHighlight: string;
  attribution: string;
}

// ─── About ───
export interface About {
  heading: string;
  paragraphs: string[];
  backgroundImage?: SanityImage;
}

// ─── Client ───
export interface ClientCard {
  _id: string;
  title: string;
  slug: { current: string };
  coupleName: string;
  date: string;
  venue: string;
  description: string;
  coverImage: SanityImage;
  category?: { title: string };
}

export interface GalleryImage {
  _key: string;
  asset: { _id: string; url: string };
  caption?: string;
}

export interface Video {
  title: string;
  url: string;
}

export interface ClientDetail extends ClientCard {
  longDescription?: any[];
  gallery?: GalleryImage[];
  videos?: Video[];
}
