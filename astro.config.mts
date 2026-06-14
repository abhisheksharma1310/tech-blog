import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { readFileSync } from "fs";

export default defineConfig({
  site: 'https://learncode.live',
  output: 'static',
  integrations: [react(), mdx()],
  
  markdown: {
    syntaxHighlight: 'prism',
    // Prevents Prism from crashing the build when encountering unknown language tags
    remarkPlugins: [],
    rehypePlugins: [],
  },

  build: {
    concurrency: 1, 
    rollupOptions: {
      maxParallelFileOps: 1,
      output: {
        manualChunks: undefined,
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
        maxParallelFileOps: 1
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
    
    // Add a quick global replace plugin to catch and fix the 'prisma' token error inside Vite execution threads
    plugins: [{
      name: 'prism-language-fallback',
      transform(code, id) {
        if (id.endsWith('.md') || id.endsWith('.mdx')) {
          // Temporarily maps ```prisma code fences to standard javascript syntax highlighting tags
          return {
            code: code.replace(/```prisma/g, '```javascript'),
            map: null
          };
        }
      }
    }]
  },

  compressHTML: false,
});
