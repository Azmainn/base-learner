import {FolderIcon} from '@sanity/icons/Folder'
import {defineArrayMember, defineField, defineType} from 'sanity'

// Embedded in a course. "Module 5" / "Lesson 5.1" labels are derived from array order, not stored.
export const courseModule = defineType({
  name: 'module',
  type: 'object',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'lessons',
      type: 'array',
      description: 'In teaching order. Every lesson should cover this module’s topic.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'lesson'}]})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
  ],
  preview: {
    select: {title: 'title', lessons: 'lessons'},
    prepare: ({title, lessons}) => ({
      title,
      subtitle: `${lessons?.length ?? 0} lessons`,
    }),
  },
})
