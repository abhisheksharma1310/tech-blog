export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Legal & Info */}
        <div>
          <h3>
            Info
          </h3>
          <ul >
            <li>
              <a href="/about" className="hover:underline" >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:underline"
                
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="hover:underline"
                
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline" >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="/sitemap.xml"
                className="hover:underline"
                
              >
                Sitemap
              </a>
            </li>
          </ul>
        </div>

        {/* Course Topics
        <div>
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Courses
          </h3>
          <ul className="space-y-1">
            {Object.keys(validTopics).map((topic) => (
              <li key={topic}>
                <a
                  href={`/${topic}`}
                  className="hover:underline capitalize"
                  
                >
                  {topic}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Branding */}
        <div className="text-xs text-gray-500 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://www.learncode.live"
              className="hover:underline"
              
            >
              www.learncode.live
            </a>
          </p>
          <p className="mt-2">
            Empowering learners with interactive coding playground, tutorials,
            quizzes, exercises, cheatsheets and resources.
          </p>
        </div>
      </div>
    </footer>
  );
}
