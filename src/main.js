import './style.css'

const toggle = document.getElementById('menu-toggle')
const menu = document.getElementById('mobile-menu')

function setMenu(open) {
  menu.classList.toggle('hidden', !open)
  toggle.setAttribute('aria-expanded', String(open))
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  document.getElementById('menu-open-icon').classList.toggle('hidden', open)
  document.getElementById('menu-close-icon').classList.toggle('hidden', !open)
}

if (toggle && menu) {
  toggle.addEventListener('click', () => setMenu(menu.classList.contains('hidden')))
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)))
}

