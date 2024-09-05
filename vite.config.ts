// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util',
      buffer: 'buffer',
      crypto: 'crypto-browserify',
      assert: 'assert',
      http: 'stream-http',
      https: 'https-browserify',
      os: 'os-browserify/browser',
      url: 'url',
    }
  },
  define: {
    'process.env': {},
    global: {}
  },
  build: {
    rollupOptions: {
      external: ['lodash'],
      plugins: [
        // Ignore "Module level directives" warnings
        {
          name: 'ignore-module-level-directives',
          transform(code, id) {
            if (id.includes('node_modules')) {
              return {
                code: code.replace(/^#![^\n]*\n/gm, ''),
                map: null
              }
            }
          }
        }
      ]
    }
  },
  optimizeDeps: {
    include: ['lodash'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
    }
  }
})