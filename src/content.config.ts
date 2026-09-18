import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['技术札记', '生活切片', '拾光摘录']),
    tags: z.array(z.string()).default([]),
    sourceDoc: z.string().url(),
    slug: z.string(),
  }),
});

export const collections = { posts };
