import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [react(), tailwind()],
  define: {
    'process.env.VITE_API_URL': JSON.stringify(
      process.env.PUBLIC_API_URL || 'https://urban-copilot-ai-161673370619.northamerica-south1.run.app'
    ),
  },
  scripts: {
    build: "astro build"
  }
});
