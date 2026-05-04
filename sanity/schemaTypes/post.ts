import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        }
      ]
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short summary used in blog cards and SEO meta description.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alternative text' }
          ]
        }
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Agronomy', value: 'Agronomy' },
          { title: 'Market Trends', value: 'Market Trends' },
          { title: 'Agrolocale News', value: 'Agrolocale News' },
          { title: 'Investment', value: 'Investment' },
        ]
      }
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Metadata',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title', description: 'Overrides the main title for search engines.' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', description: 'Overrides the excerpt for search engines.' },
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'coverImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
