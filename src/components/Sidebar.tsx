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
  const children = Object.values(node.children);
  if (children.length === 0) return null;

  return (
    <ul className="space-y-0.5">
      {children.map((child) => {
        const hasChildren = Object.keys(child.children).length > 0;
        const hasPosts = child.posts.length > 0;
        const open = isActiveInNode(child, activeSlug);
        const count = child.posts.length;

        const isLeaf = !hasChildren;

        return (
          <li key={child.name}>
            <details open={open} className="group">
              <summary className={depth === 0 ? 'sidebar-summary-root' : 'sidebar-summary'}>
                <span className="sidebar-arrow" />
                <span className="flex-1 min-w-0 truncate">{child.name}</span>
                {count > 0 && <span className="sidebar-count">{count}</span>}
              </summary>

              <div className="ml-3 mt-0.5 space-y-0.5">
                {hasPosts && (
                  <ul className="space-y-0.5">
                    {child.posts.map((post) => (
                      <li key={post.slug}>
                        <a
                          href={`/${post.slug}`}
                          onClick={onLinkClick}
                          className={post.slug === activeSlug ? 'sidebar-link-active' : 'sidebar-link'}
                        >
                          {post.data.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {renderNode(child, depth + 1, activeSlug, onLinkClick)}
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
        <h2 className="sidebar-header">Courses</h2>
      </div>
      {renderNode(tree, 0, activeSlug, onLinkClick)}
    </nav>
  );
}
