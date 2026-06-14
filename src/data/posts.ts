// src/data/posts.ts
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPosts(): Promise<Post[]> {
  const allPosts = await getCollection('blog');

  return allPosts
    .filter((post) => !post.data.draft)
    .sort((a, b) => {
      const catA = a.data.category?.join('/') || '';
      const catB = b.data.category?.join('/') || '';

      if (catA !== catB) return catA.localeCompare(catB);

      const orderA = a.data.order ?? Infinity;
      const orderB = b.data.order ?? Infinity;

      if (orderA !== orderB) return orderA - orderB;

      return b.data.date.localeCompare(a.data.date);
    });
}
