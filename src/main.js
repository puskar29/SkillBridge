// SkillBridge – shared JavaScript
// This file loads on every page (it is imported in the <head> via /src/main.js).

// Import the main stylesheet (Tailwind is processed by Vite at build time)
import './style.css'

// ---------------------------------------------------------------
// Mobile navigation (hamburger) menu
// ---------------------------------------------------------------
const toggle = document.getElementById('menu-toggle')
const menu = document.getElementById('mobile-menu')

// Opens or closes the menu and swaps the hamburger / close icons
function setMenu(open) {
  menu.classList.toggle('hidden', !open)
  toggle.setAttribute('aria-expanded', String(open))
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  document.getElementById('menu-open-icon').classList.toggle('hidden', open)
  document.getElementById('menu-close-icon').classList.toggle('hidden', !open)
}

// Only wire up the menu when the toggle exists on the current page
if (toggle && menu) {
  // Clicking the hamburger button opens/closes the menu
  toggle.addEventListener('click', () => setMenu(menu.classList.contains('hidden')))

  // Close the menu automatically after a link is tapped
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)))
}
