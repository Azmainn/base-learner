import {PlayIcon} from '@sanity/icons/Play'
import {defineArrayMember, defineField, defineType} from 'sanity'

// Hosts whose embeds the lesson page can play (AGENTS.md §9).
const VIDEO_HOSTS = [
  'youtube.com',
  'youtu.be',
  'vimeo.com',
  'mediadelivery.net', // Bunny Stream: iframe.mediadelivery.net / player.mediadelivery.net
]

function isSupportedVideoUrl(value: string) {
  try {
    const host = new URL(value).hostname.replace(/^www\./, '')
    return VIDEO_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))
  } catch {
    return false
  }
}

export const lesson = defineType({
  name: 'lesson',
  type: 'document',
  icon: PlayIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'video', title: 'Video'},
    {name: 'extras', title: 'Extras'},
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
      rows: 2,
      group: 'content',
      description: 'One or two sentences shown under the lesson title and on search results.',
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
      title: 'Video URL',
      group: 'video',
      description: 'YouTube, Vimeo, or Bunny Stream URL.',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['https']})
          .custom((value) =>
            !value || isSupportedVideoUrl(value)
              ? true
              : 'Use a YouTube, Vimeo, or Bunny Stream URL',
          ),
    }),
    defineField({
      name: 'poster',
      type: 'image',
      group: 'video',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alternative text'})],
    }),
    defineField({
      name: 'duration',
      type: 'number',
      group: 'video',
      description: 'Length in minutes.',
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: 'freePreview',
      type: 'boolean',
      group: 'video',
      description: 'Shows a “Free preview” label. Not access control.',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      type: 'number',
      group: 'content',
      description: 'Display only.',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'notes',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'keyPoints',
      type: 'array',
      group: 'content',
      description: '“In this lesson you will” bullets.',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'proTip',
      type: 'text',
      rows: 2,
      group: 'extras',
    }),
    defineField({
      name: 'resources',
      type: 'array',
      group: 'extras',
      of: [defineArrayMember({type: 'resource'})],
    }),
  ],
  preview: {
    select: {title: 'title', duration: 'duration', media: 'poster'},
    prepare: ({title, duration, media}) => ({
      title,
      subtitle: duration ? `${duration} min` : undefined,
      media,
    }),
  },
})
