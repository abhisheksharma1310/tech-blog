import type { Post } from '../data/posts';

interface ArticleCardProps {
  post: Post;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const { title, description, date, category, tags } = post.data;

  return (
    <article className="post-card">
      <a href={post.slug}>
        <h2>{title}</h2>
      </a>
      <p>{description}</p>
      {/* <div className="meta">
        <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
        <span>{category.join(' / ')}</span>
      </div> */}
      <div className="tags">
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
