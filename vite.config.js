import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        opportunities: fileURLToPath(new URL('./opportunities.html', import.meta.url)),
        workshops: fileURLToPath(new URL('./workshops.html', import.meta.url)),
        internships: fileURLToPath(new URL('./internships.html', import.meta.url)),
        scholarships: fileURLToPath(new URL('./scholarships.html', import.meta.url)),
        about: fileURLToPath(new URL('./about.html', import.meta.url)),
        contact: fileURLToPath(new URL('./contact.html', import.meta.url)),
      },
    },
  },
})