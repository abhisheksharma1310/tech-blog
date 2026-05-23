export default function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <h1>
          <a href="/">Tech Blog</a>
        </h1>
      </div>

      <div className="nav-group">
        <nav>
          <a href="/blog">Blog</a>
        </nav>

        <button
          id="theme-toggle"
          type="button"
          className="theme-toggle"
          aria-label="Switch to dark mode"
        >
          🌙
        </button>

        <label
          htmlFor="mobile-menu-toggle"
          className="mobile-menu-button"
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </label>
      </div>
    </header>
  );
}
