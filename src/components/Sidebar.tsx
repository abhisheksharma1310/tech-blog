import type { Post } from '../data/posts';

interface SidebarProps {
  posts: Post[];
  activeSlug?: string;
  onLinkClick?: () => void;
}

type TreeNode = {
  name: string;
  posts: Post[];
  children: Record<string, TreeNode>;
};

function buildTree(posts: Post[]) {
  const root: TreeNode = { name: 'root', posts: [], children: {} };
  for (const post of posts) {
    const categories = post.data.category.length ? post.data.category : ['Other'];
    let node = root;
    for (const category of categories) {
      if (!node.children[category]) {
        node.children[category] = { name: category, posts: [], children: {} };
      }
      node = node.children[category];
    }
    node.posts.push(post);
  }
  return root;
}

function isActiveInNode(node: TreeNode, activeSlug?: string): boolean {
  if (!activeSlug) return false;
  if (node.posts.some((post) => post.slug === activeSlug)) return true;
  return Object.values(node.children).some((child) => isActiveInNode(child, activeSlug));
}

function renderNode(node: TreeNode, depth: number, activeSlug?: string, onLinkClick?: () => void) {
  return (
    <ul className="space-y-0.5">
      {Object.values(node.children).map((child) => {
        const hasChildren = Object.keys(child.children).length > 0;
        const hasPosts = child.posts.length > 0;
        const open = isActiveInNode(child, activeSlug);
        const count = child.posts.length;

        return (
          <li key={child.name}>
            <details open={open} className="group">
              <summary className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md cursor-pointer list-none transition-colors
                ${depth === 0
                  ? 'text-black dark:text-white font-semibold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                }`}
              >
                <svg className={`w-3 h-3 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <span>{child.name}</span>
                {count > 0 && (
                  <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">{count}</span>
                )}
              </summary>

              <div className="ml-3 mt-0.5 space-y-0.5">
                {hasPosts && (
                  <ul className="space-y-0.5">
                    {child.posts.map((post) => (
                      <li key={post.slug}>
                        <a
                          href={`/${post.slug}`}
                          onClick={onLinkClick}
                          className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                            post.slug === activeSlug
                              ? 'bg-gray-100 dark:bg-white/10 text-black dark:text-white font-medium'
                              : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                          }`}
                        >
                          {post.data.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {hasChildren && renderNode(child, depth + 1, activeSlug, onLinkClick)}
              </div>
            </details>
          </li>
        );
      })}
    </ul>
  );
}

export default function Sidebar({ posts, activeSlug, onLinkClick }: SidebarProps) {
  const tree = buildTree(posts);

  return (
    <nav className="py-4" aria-label="Course navigation">
      <div className="px-3 mb-3">
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          Courses
        </h2>
      </div>
      {renderNode(tree, 0, activeSlug, onLinkClick)}
    </nav>
  );
}
