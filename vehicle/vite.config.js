import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'ui-vendor': ['@headlessui/react', '@heroicons/react'],
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: [
      '@tanstack/react-query',
      '@headlessui/react',
      '@heroicons/react',
      'react-router-dom'
    ],
    esbuildOptions: {
      target: 'es2015'
    }
  },
  resolve: {
    dedupe: ['@tanstack/react-query'],
    mainFields: ['module', 'jsnext:main', 'jsnext', 'browser', 'main']
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true
  },
  preview: {
    port: 5173,
    strictPort: true,
    host: true
  }
})
