import { getPosts } from '../data/posts';

export const prerender = true;

export async function GET() {
  const site = 'https://astro-tech-blog.example.com';
  const posts = getPosts();

  const urls = [
    `${site}/`,
    `${site}/blog/`,
    ...posts.map((post) => `${site}${post.url}`)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`)
    .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
