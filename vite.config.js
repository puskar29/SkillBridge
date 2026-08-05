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
        hackathons: fileURLToPath(new URL('./src/pages/hackathons.html', import.meta.url)),
        events: fileURLToPath(new URL('./src/pages/events.html', import.meta.url)),
        bootcamps: fileURLToPath(new URL('./src/pages/bootcamps.html', import.meta.url)),
        about: fileURLToPath(new URL('./src/pages/about.html', import.meta.url)),
        contact: fileURLToPath(new URL('./src/pages/contact.html', import.meta.url)),
        login: fileURLToPath(new URL('./src/pages/login.html', import.meta.url)),
        signup: fileURLToPath(new URL('./src/pages/signup.html', import.meta.url)),
        'student-panel': fileURLToPath(new URL('./src/pages/student-panel.html', import.meta.url)),
        'student-opportunities': fileURLToPath(new URL('./src/pages/student-opportunities.html', import.meta.url)),
        'student-registrations': fileURLToPath(new URL('./src/pages/student-registrations.html', import.meta.url)),
        'student-profile': fileURLToPath(new URL('./src/pages/student-profile.html', import.meta.url)),
        'student-settings': fileURLToPath(new URL('./src/pages/student-settings.html', import.meta.url)),
        'admin-panel': fileURLToPath(new URL('./src/pages/admin-panel.html', import.meta.url)),
        'admin-users': fileURLToPath(new URL('./src/pages/admin-users.html', import.meta.url)),
        'admin-opportunities': fileURLToPath(new URL('./src/pages/admin-opportunities.html', import.meta.url)),
        'admin-registrations': fileURLToPath(new URL('./src/pages/admin-registrations.html', import.meta.url)),
        'admin-payments': fileURLToPath(new URL('./src/pages/admin-payments.html', import.meta.url)),
        'admin-reports': fileURLToPath(new URL('./src/pages/admin-reports.html', import.meta.url)),
        'admin-settings': fileURLToPath(new URL('./src/pages/admin-settings.html', import.meta.url)),
      },
    },
  },
})