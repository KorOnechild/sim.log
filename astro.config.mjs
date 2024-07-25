import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://koronechild.github.io',
  base: 'sim.log',
  integrations: [react()]
});