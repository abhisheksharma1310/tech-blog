const footerLinks = {
  Course: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  Resources: [
    { href: '/sitemap.xml', label: 'Sitemap' },
    { href: '/rss.xml', label: 'RSS Feed' },
    { href: 'https://lab.learncode.live', label: 'Coding Lab' },
  ],
  Legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-white/[0.02]">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="text-lg font-semibold text-black dark:text-white">
              LearnCode<span className="text-brand-green">.live</span>
            </a>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              Empowering learners with interactive coding tutorials, quizzes, exercises, and resources for programming, DSA, web development, cloud computing, and embedded/IoT.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-black dark:text-white mb-3">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} LearnCode.live. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:contact@learncode.live" className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              contact@learncode.live
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
