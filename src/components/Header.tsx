export default function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <h1>
          <a href="/">LearnCodeLive</a>
        </h1>
      </div>

      <div className="nav-group">
        <nav>
          <a href="https://lab.learncode.live" target="_blank" style={{fontWeight: "bold"}}>Coding Lab</a>
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
