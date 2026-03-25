import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'philosophy',
  title: '💬 Philosophy Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
      initialValue: 'OUR PHILOSOPHY',
    }),
    defineField({
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      rows: 4,
      initialValue:
        '"We don\'t just photograph weddings. We preserve the feeling of them."',
    }),
    defineField({
      name: 'quoteHighlight',
      title: 'Highlighted Word (in italic/gold)',
      type: 'string',
      description: 'Which word to highlight in the quote, e.g. "feeling"',
      initialValue: 'feeling',
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      initialValue: '— SIDDHANT KAPOOR  ·  LEAD PHOTOGRAPHER',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Philosophy Section' };
    },
  },
});
