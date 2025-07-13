import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // Configuración para desarrollo
    port: 5173,
    host: true, // Permite acceso desde la red
    cors: true, // Habilita CORS
    
    // Proxy para APIs que no soportan CORS (desarrollo)
    proxy: {
      '/api-proxy': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-proxy/, ''),
        secure: true
      }
    }
  },
  build: {
    // Configuración simplificada para producción
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild', // Usar esbuild en lugar de terser
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue']
        }
      }
    }
  },
  preview: {
    port: 4173,
    host: true
  }
})
