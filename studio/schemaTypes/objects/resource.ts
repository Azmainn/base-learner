import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'

export const resource = defineType({
  name: 'resource',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Documentation', value: 'documentation'},
          {title: 'Guide', value: 'guide'},
          {title: 'Repository', value: 'repository'},
          {title: 'Article', value: 'article'},
          {title: 'Video', value: 'video'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'type'},
  },
})
