import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/pages': '/src/pages',
      '@/lib': '/src/lib',
      '@/types': '/src/types',
      '@/utils': '/src/utils',
      '@/hooks': '/src/hooks',
      '@/styles': '/src/styles',
    },
  },
})
