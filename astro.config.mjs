// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  vite: {plugins: [tailwindcss()]},
  integrations: [mdx()],
  site: 'https://6a96b9ddf63f37b6ae0a330d--blog-astro-test01.netlify.app/'
});