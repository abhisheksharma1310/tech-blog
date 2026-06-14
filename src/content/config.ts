// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(), 
    category: z.array(z.string()),
    tags: z.array(z.string()),
    // REMOVED: slug: z.string() -> Astro captures this implicitly!
    author: z.string(),
    order: z.number().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
};
