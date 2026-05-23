export default function AdBlock() {
  return (
    <div>
      <div className="blog-ad">
        <h3>Sponsored Content</h3>
        <p>Promote your cloud, IoT, or DevOps tool here with a simple static placement.</p>
      </div>
      <div className="blog-ad" style={{ marginTop: '1rem' }}>
        <h3>Build faster with Astro</h3>
        <p>Static output on Cloudflare Pages makes deployment fast and secure.</p>
      </div>
      <div className="blog-ad" style={{ marginTop: '1rem' }}>
        <h3>Explore categories</h3>
        <p>Web development, Cloud Computing, Embedded/IoT, DevOps, Aptitude — all in one place.</p>
      </div>
    </div>
  );
}
