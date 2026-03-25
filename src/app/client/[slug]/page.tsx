import { notFound } from 'next/navigation';
import { client, urlFor, CLIENT_DETAIL_QUERY, ALL_CLIENT_SLUGS } from '@/lib/sanity';
import ClientGalleryPage from '@/components/ClientGalleryPage';

export const revalidate = 60;

// Generate static paths at build time
export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(ALL_CLIENT_SLUGS);
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const data = await client.fetch(CLIENT_DETAIL_QUERY, { slug: params.slug });
    if (!data) return { title: 'Wedding — WBSK' };
    return {
      title: `${data.title} — ${data.coupleName} | WBSK`,
      description: data.description,
    };
  } catch {
    return { title: 'Wedding — WBSK' };
  }
}

export default async function ClientPage({ params }: { params: { slug: string } }) {
  let data: any = null;

  try {
    data = await client.fetch(CLIENT_DETAIL_QUERY, { slug: params.slug });
  } catch {
    // CMS not connected
  }

  if (!data) {
    notFound();
  }

  // Build image URLs
  const coverUrl = data.coverImage
    ? urlFor(data.coverImage).width(1920).url()
    : '';

  const galleryUrls = (data.gallery || []).map((img: any) => ({
    url: img.asset?.url || urlFor(img).width(1200).url(),
    caption: img.caption,
    key: img._key,
  }));

  // Parse video embed URLs
  const videos = (data.videos || []).map((v: any) => ({
    title: v.title,
    embedUrl: getEmbedUrl(v.url),
  }));

  return (
    <ClientGalleryPage
      title={data.title}
      coupleName={data.coupleName}
      date={data.date}
      venue={data.venue}
      description={data.description}
      coverUrl={coverUrl}
      gallery={galleryUrls}
      videos={videos}
    />
  );
}

function getEmbedUrl(url: string): string {
  if (!url) return '';

  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`;

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return url;
}
