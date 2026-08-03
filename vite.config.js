import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./pages/index.html', import.meta.url)),
        opportunities: fileURLToPath(new URL('./pages/opportunities.html', import.meta.url)),
        workshops: fileURLToPath(new URL('./pages/workshops.html', import.meta.url)),
        internships: fileURLToPath(new URL('./pages/internships.html', import.meta.url)),
        scholarships: fileURLToPath(new URL('./pages/scholarships.html', import.meta.url)),
        about: fileURLToPath(new URL('./pages/about.html', import.meta.url)),
        contact: fileURLToPath(new URL('./pages/contact.html', import.meta.url)),
      },
    },
  },
})