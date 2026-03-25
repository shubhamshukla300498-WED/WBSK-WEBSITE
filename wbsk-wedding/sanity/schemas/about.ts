import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'about',
  title: '📖 About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'About Weddings by Siddhant Kapoor',
    }),
    defineField({
      name: 'paragraphs',
      title: 'About Text (paragraphs)',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item is a paragraph',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Section' };
    },
  },
});
