export default function AdBlock() {
  return (
    <div className="space-y-4 py-4">
      <div className="bg-gradient-to-br from-brand-green/10 to-brand-green/5 border border-brand-green/20 dark:border-brand-green/10 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-black dark:text-white mb-1">
          Practice Coding Live
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
          Practice DSA Questions and Web development in your browser with our interactive coding lab.
        </p>
        <a
          href="https://lab.learncode.live"
          target="_blank"
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-black dark:bg-brand-green dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-brand-green-deep transition-colors"
        >
          Open Coding Lab
          <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-black dark:text-white mb-2">
          Support Us
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          Your visits help us create more free educational content. Share our site with fellow learners!
        </p>
      </div>
    </div>
  );
}
