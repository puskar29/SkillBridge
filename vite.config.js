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
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        opportunities: fileURLToPath(new URL('./src/pages/opportunities.html', import.meta.url)),
        workshops: fileURLToPath(new URL('./src/pages/workshops.html', import.meta.url)),
        internships: fileURLToPath(new URL('./src/pages/internships.html', import.meta.url)),
        scholarships: fileURLToPath(new URL('./src/pages/scholarships.html', import.meta.url)),
        about: fileURLToPath(new URL('./src/pages/about.html', import.meta.url)),
        contact: fileURLToPath(new URL('./src/pages/contact.html', import.meta.url)),
        login: fileURLToPath(new URL('./src/pages/login.html', import.meta.url)),
        signup: fileURLToPath(new URL('./src/pages/signup.html', import.meta.url)),
        'student-panel': fileURLToPath(new URL('./src/pages/student-panel.html', import.meta.url)),
        'admin-panel': fileURLToPath(new URL('./src/pages/admin-panel.html', import.meta.url)),
      },
    },
  },
})