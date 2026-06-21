import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function deferCSS() {
  return {
    name: 'defer-css',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(
          /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
          (_, href) =>
            `<link rel="preload" as="style" href="${href}" onload="this.rel='stylesheet'"><noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`
        );
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), deferCSS()],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'vendor-framer';
          if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) return 'vendor-i18n';
          if (id.includes('node_modules/lucide-react')) return 'vendor-icons';
        },
      },
    },
  },
})
