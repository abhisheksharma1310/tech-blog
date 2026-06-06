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

// 1. Scan the new 'posts' folder recursively (** covers all subfolders)
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
      // 2. Removed '/blog/' prefix from the URL asset path
      url: `/${slug}`, 
      frontmatter: module.frontmatter,
      Content: module.default
    };
  })
  .filter((post) => !post.frontmatter.draft)
  .sort((a, b) => {
    const catA = a.frontmatter.category[0] || '';
    const catB = b.frontmatter.category[0] || '';

    if (catA !== catB) {
      return catA.localeCompare(catB);
    }

    const orderA = a.frontmatter.order ?? Infinity;
    const orderB = b.frontmatter.order ?? Infinity;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return b.frontmatter.date.localeCompare(a.frontmatter.date);
  });

export function getPosts() {
  return posts;
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
