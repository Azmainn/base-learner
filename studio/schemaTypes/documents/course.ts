import {BookIcon} from '@sanity/icons/Book'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const course = defineType({
  name: 'course',
  type: 'document',
  icon: BookIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'marketing', title: 'Marketing'},
    {name: 'curriculum', title: 'Curriculum'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      group: 'content',
      description: 'Square artwork. Also used as the course icon on cards and search results.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alternative text'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'level',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instructor',
      type: 'reference',
      group: 'content',
      to: [{type: 'instructor'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      group: 'content',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      type: 'number',
      group: 'marketing',
      description: 'In USD. 0 means free.',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'popular',
      type: 'boolean',
      group: 'marketing',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      type: 'number',
      group: 'marketing',
      description: 'Display only.',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'learningOutcomes',
      type: 'array',
      group: 'marketing',
      description: '“What you’ll learn” cards.',
      of: [defineArrayMember({type: 'learningOutcome'})],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'modules',
      type: 'array',
      group: 'curriculum',
      description: 'In teaching order.',
      of: [defineArrayMember({type: 'module'})],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'title', level: 'level', media: 'coverImage'},
    prepare: ({title, level, media}) => ({
      title,
      subtitle: level ? level[0].toUpperCase() + level.slice(1) : undefined,
      media,
    }),
  },
})
