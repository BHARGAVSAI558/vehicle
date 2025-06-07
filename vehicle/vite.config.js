import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query']
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ['@tanstack/react-query'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  resolve: {
    dedupe: ['@tanstack/react-query'],
    mainFields: ['module', 'jsnext:main', 'jsnext', 'browser', 'main']
  },
  ssr: {
    noExternal: ['@tanstack/react-query']
  }
})
