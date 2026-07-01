import type { Post } from '../data/posts';

interface ArticleCardProps {
  post: Post;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const { title, description, date, category, tags } = post.data;

  return (
    <article className="group relative bg-white dark:bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-card dark:hover:shadow-none dark:hover:bg-white/[0.02] transition-all duration-200">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium text-brand-green bg-brand-green/10 dark:bg-brand-green/20 px-2 py-0.5 rounded-full">
          {category.join(' / ')}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">{date}</span>
      </div>

      <a href={`/${post.slug}`} className="block">
        <h3 className="text-lg font-semibold text-black dark:text-white group-hover:text-brand-green-deep dark:group-hover:text-brand-green transition-colors mb-2">
          {title}
        </h3>
      </a>

      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 px-2 py-0.5 rounded-md border border-gray-200 dark:border-gray-800"
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="text-xs text-gray-400 dark:text-gray-500">+{tags.length - 3}</span>
        )}
      </div>
    </article>
  );
}
