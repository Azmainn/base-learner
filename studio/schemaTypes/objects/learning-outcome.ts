import {TargetIcon} from '@sanity/icons/Target'
import {defineField, defineType} from 'sanity'

export const learningOutcome = defineType({
  name: 'learningOutcome',
  type: 'object',
  icon: TargetIcon,
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      description: 'Icon shown on the “What you’ll learn” card.',
      options: {
        list: [
          {title: 'Layers', value: 'layers'},
          {title: 'Database', value: 'database'},
          {title: 'Gauge', value: 'gauge'},
          {title: 'Cloud', value: 'cloud'},
          {title: 'Code', value: 'code'},
          {title: 'Shield', value: 'shield'},
          {title: 'Rocket', value: 'rocket'},
          {title: 'Book', value: 'book'},
        ],
      },
      initialValue: 'book',
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
})
