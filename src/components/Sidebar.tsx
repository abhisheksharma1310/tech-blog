import type { Post } from '../data/posts';

interface SidebarProps {
  posts: Post[];
  activeSlug?: string;
}

type TreeNode = {
  name: string;
  posts: Post[];
  children: Record<string, TreeNode>;
};

function buildTree(posts: Post[]) {
  const root: TreeNode = { name: 'root', posts: [], children: {} };

  for (const post of posts) {
    const categories = post.frontmatter.category.length ? post.frontmatter.category : ['Other'];
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

function renderNode(node: TreeNode, activeSlug?: string) {
  return (
    <ul>
      {Object.values(node.children).map((child) => {
        const hasChildren = Object.keys(child.children).length > 0;
        const hasPosts = child.posts.length > 0;
        const open = isActiveInNode(child, activeSlug);

        return (
          <li key={child.name}>
            <details open={open}>
              <summary>{child.name}</summary>

              {hasPosts ? (
                <ul>
                  {child.posts.map((post) => (
                    <li key={post.slug}>
                      <a
                        href={post.url}
                        className={post.slug === activeSlug ? 'active' : undefined}
                      >
                        {post.frontmatter.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}

              {hasChildren ? renderNode(child, activeSlug) : null}
            </details>
          </li>
        );
      })}
    </ul>
  );
}

export default function Sidebar({ posts, activeSlug }: SidebarProps) {
  const tree = buildTree(posts);

  return (
    <div>
      <h2>Categories</h2>
      {renderNode(tree, activeSlug)}
    </div>
  );
}
