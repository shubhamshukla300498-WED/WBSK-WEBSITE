import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: '🏠 Home Page',
  type: 'document',
  fields: [
    // ─── HERO SECTION ───
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading (Large Text)',
      type: 'string',
      description: 'e.g. "Timeless Moments. Preserved."',
      initialValue: 'Timeless Moments. Preserved.',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 3,
      description: 'Short description below the heading',
      initialValue:
        'Luxury wedding photography capturing authentic emotions, untold stories, and the quiet in-between moments that define your love.',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'The large parallax background image for the hero section',
    }),
    defineField({
      name: 'heroCTAText',
      title: 'Hero CTA Button Text',
      type: 'string',
      initialValue: 'View Portfolio',
    }),
    defineField({
      name: 'heroSecondaryButtonText',
      title: 'Hero Secondary Button Text',
      type: 'string',
      initialValue: 'Book a Session',
    }),

    // ─── SCROLLING CATEGORIES BAR ───
    defineField({
      name: 'scrollingCategories',
      title: 'Scrolling Categories (bottom ticker)',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'These scroll infinitely at the bottom of the hero. e.g. Pre-Wedding, Bride & Groom, Luxury Photography...',
      initialValue: [
        'Pre-Wedding',
        'Bride & Groom',
        'Luxury Photography',
        'Weddings',
        'Candid Moments',
        'Haldi Ceremonies',
        'Portraits',
        'Engagements',
      ],
    }),

    // ─── STATS ───
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              type: 'string',
              title: 'Number',
              description: 'e.g. "9+", "500+", "1", "∞"',
            },
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              description: 'e.g. "Years of Craft"',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page Content' };
    },
  },
});
