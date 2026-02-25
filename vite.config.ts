import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  base: 'http://localhost:4173/',
  plugins: [
    react(),
    federation({
      name: 'mfe-settings',
      filename: 'remoteEntry.js',
      exposes: {
        './Settings': './src/bootstrap.tsx',
      },
      shared: ['react', 'react-dom'],
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
});
