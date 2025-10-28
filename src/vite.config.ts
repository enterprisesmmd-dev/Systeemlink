import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable sourcemaps for production
    minify: 'terser',
    
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react'],
        },
      },
    },
    
    // Terser options for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
        drop_debugger: true,
      },
    },
    
    // Asset optimization
    assetsInlineLimit: 4096, // 4kb
    chunkSizeWarningLimit: 1000,
  },
  
  // Server configuration (for development)
  server: {
    port: 3000,
    strictPort: false,
    open: true,
  },
  
  // Preview configuration (for testing build)
  preview: {
    port: 4173,
    strictPort: false,
    open: true,
  },
  
  // Resolve aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@components': resolve(__dirname, './components'),
      '@hooks': resolve(__dirname, './hooks'),
      '@lib': resolve(__dirname, './lib'),
    },
  },
  
  // CSS configuration
  css: {
    postcss: {
      plugins: [],
    },
  },
  
  // Optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
