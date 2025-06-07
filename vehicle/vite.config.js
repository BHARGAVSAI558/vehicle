import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      external: ['@tanstack/react-query'],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query']
        },
        globals: {
          '@tanstack/react-query': 'ReactQuery'
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ['@tanstack/react-query'],
    exclude: ['@tanstack/react-query'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  resolve: {
    dedupe: ['@tanstack/react-query'],
    alias: {
      '@tanstack/react-query': '@tanstack/react-query/dist/index.js'
    },
    mainFields: ['module', 'jsnext:main', 'jsnext', 'browser', 'main']
  },
  ssr: {
    noExternal: ['@tanstack/react-query']
  }
})
