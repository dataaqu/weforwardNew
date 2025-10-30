import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['embla-carousel', 'embla-carousel-auto-scroll']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/storage'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'yup', 'zod'],
          'radix-vendor': ['@radix-ui/react-label', '@radix-ui/react-navigation-menu', '@radix-ui/react-slot'],
          
          // App chunks
          'admin': [
            './src/pages/admin/AdminDashboard',
            './src/pages/admin/AdminPosts', 
            './src/pages/admin/AdminNewPost',
            './src/pages/admin/AdminCategories',
            './src/pages/admin/AdminLogin',
            './src/components/admin/AdminLayout',
            './src/components/admin/BlogPostEditorSimple',
            './src/components/admin/ProtectedRoute'
          ]
        }
      }
    },
    // Increase chunk size warning limit since we're optimizing manually
    chunkSizeWarningLimit: 1000
  }
})
