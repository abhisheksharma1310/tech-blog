// src/data/posts.ts
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

// Define a safe, lightweight interface for navigation components
export interface PostMetadata {
  slug: string;
  data: {
    title: string;
    category: string[];
    order?: number;
  };
}

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

// FIX: New function that returns ONLY sidebar-required properties
export async function getPostsMetadata(): Promise<PostMetadata[]> {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
    data: {
      title: post.data.title,
      category: post.data.category,
      order: post.data.order,
    },
  }));
}
