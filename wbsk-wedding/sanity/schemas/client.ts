import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'client',
  title: '💒 Clients (Weddings)',
  type: 'document',
  fields: [
    // ─── BASIC INFO ───
    defineField({
      name: 'title',
      title: 'Wedding Title',
      type: 'string',
      description: 'e.g. "Garden Romance"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Click "Generate" to auto-create from title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coupleName',
      title: 'Couple Name',
      type: 'string',
      description: 'e.g. "Garhima & Ankur"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Wedding Date',
      type: 'date',
    }),
    defineField({
      name: 'venue',
      title: 'Venue / Location',
      type: 'string',
      description: 'e.g. "Sanskriti Greens, Faridabad"',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description shown on the card',
    }),
    defineField({
      name: 'longDescription',
      title: 'Full Story (for client page)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed story about the wedding — shown on the client detail page',
    }),

    // ─── CATEGORY ───
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),

    // ─── IMAGES ───
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Card Thumbnail)',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image shown on the wedding card',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption (optional)',
            },
          ],
        },
      ],
      description: 'Drag & drop images here. They will appear in the client gallery page.',
    }),

    // ─── VIDEOS ───
    defineField({
      name: 'videos',
      title: 'Video Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Video Title',
              description: 'e.g. "Wedding Highlights"',
            },
            {
              name: 'url',
              type: 'url',
              title: 'Video URL (YouTube or Vimeo)',
              description: 'Paste full YouTube or Vimeo link',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https'],
                }),
            },
          ],
        },
      ],
      description: 'Paste YouTube or Vimeo links. Videos will play on the client page.',
    }),

    // ─── VISIBILITY ───
    defineField({
      name: 'featured',
      title: 'Featured on Homepage?',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this client on the homepage',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = appears first (e.g. 1, 2, 3)',
    }),
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Wedding Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'coupleName',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle || '',
        media,
      };
    },
  },
});
