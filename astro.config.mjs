import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://hipermidia.andrehonorato.com.br',
  output: 'static',
  // URLs com barra final batem com o que o servidor estático (nginx/Coolify)
  // entrega para pastas, evitando redirects e canônicas divergentes.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    react(),
    sitemap({
      changefreq: 'monthly',
      lastmod: new Date(),
      filter: (pagina) => !pagina.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
