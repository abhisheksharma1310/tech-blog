// astro.config.mts
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://learncode.live',
  output: 'static',
  integrations: [react(), mdx(), tailwind()],

  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [],
    rehypePlugins: [],
  },

  build: {
    concurrency: 2,
    rollupOptions: {
      maxParallelFileOps: 2,
      output: {
        // FIX: Removed "manualChunks: undefined" to enable code splitting asset optimization
        generatedCode: {
          preset: 'es2022'
        }
      }
    }
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 10000,
      minify: 'esbuild',
      target: 'es2022',
      rollupOptions: {
        maxParallelFileOps: 2
      }
    },
    esbuild: {
      target: 'es2022',
      minifyIdentifiers: false,
      minifySyntax: true,
      minifyWhitespace: true,
    },
    optimizeDeps: {
      force: false
    },
    plugins: [{
      name: 'prism-language-fallback',
      transform(code, id) {
        if (id.endsWith('.md') || id.endsWith('.mdx')) {
          return {
            code: code.replace(/```prisma/g, '```javascript'),
            map: null
          };
        }
      }
    }]
  },

  compressHTML: true,
});
