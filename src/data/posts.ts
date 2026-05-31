export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string[];
  tags: string[];
  slug: string;
  author: string;
  order?: number;
  draft?: boolean;
}

export interface Post {
  slug: string;
  url: string;
  frontmatter: PostFrontmatter;
  Content: any;
}

const modules = import.meta.glob('../content/blog/**/*.{md,mdx}', { eager: true }) as Record<
  string,
  {
    frontmatter: PostFrontmatter;
    default: any;
  }
>;

const posts: Post[] = Object.entries(modules)
  .map(([path, module]) => {
    const fileName = path.split('/').pop() ?? '';
    const slug = fileName.replace(/\.(md|mdx)$/, '');

    return {
      slug,
      url: `/blog/${slug}`,
      frontmatter: module.frontmatter,
      Content: module.default
    };
  })
  .filter((post) => !post.frontmatter.draft)
  .sort((a, b) => {
    // Get the first category for each post
    const catA = a.frontmatter.category[0] || '';
    const catB = b.frontmatter.category[0] || '';

    // Sort by category first
    if (catA !== catB) {
      return catA.localeCompare(catB);
    }

    // Within same category, sort by order field if present
    const orderA = a.frontmatter.order ?? Infinity;
    const orderB = b.frontmatter.order ?? Infinity;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    // Fallback to date (newest first)
    return b.frontmatter.date.localeCompare(a.frontmatter.date);
  });

export function getPosts() {
  return posts;
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}