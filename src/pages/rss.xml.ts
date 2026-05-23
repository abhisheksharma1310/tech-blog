import { getPosts } from '../data/posts';

export const prerender = true;

export async function GET() {
  const site = 'https://astro-tech-blog.example.com';
  const posts = getPosts();
  const channelItems = posts
    .map((post) => {
      const { title, description, date, slug, author } = post.frontmatter;
      const url = `${site}${post.url}`;
      const pubDate = new Date(date).toUTCString();

      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
      <author>${author}</author>
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Astro Tech Blog</title>
    <link>${site}</link>
    <description>Technology articles on web development, cloud, embedded/IoT, DevOps, and aptitude.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${channelItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}
