/*
 * SkillBridge — shared JavaScript
 * -------------------------------
 * This file runs on every page. It handles three small "UI" jobs:
 *   1. the mobile hamburger menu
 *   2. the sidebar drawer on the dashboard / admin pages
 *   3. the live search filter on the panel pages
 *
 * A note about styling:
 * We never write Tailwind class names in JavaScript. Instead we only
 * toggle simple helper classes like "is-hidden" or "is-open", and all
 * the real styles live in src/style.css. That keeps the JS short and
 * makes the design easy to change from one single place.
 */

// Import the main stylesheet (Tailwind is processed by Vite at build time).
import './style.css'

// ===============================================================
// 1. Mobile hamburger menu
// ===============================================================
// Find the button and the two pieces of the menu in the page.
const menuButton = document.getElementById('menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')
const openIcon = document.getElementById('menu-open-icon')
const closeIcon = document.getElementById('menu-close-icon')

// Opens or closes the menu, keeping the icon and aria labels in sync.
// Arrow functions are used throughout this file — they are the modern
// way to write functions in JavaScript.
const setMenu = (open) => {
  if (open) {
    // "is-hidden" is a CSS class we made in style.css (display: none).
    mobileMenu.classList.remove('is-hidden')

    // Show the "X" icon and hide the hamburger icon.
    openIcon.classList.add('is-hidden')
    closeIcon.classList.remove('is-hidden')

    // Tell screen readers that the menu is now open.
    menuButton.setAttribute('aria-expanded', 'true')
    menuButton.setAttribute('aria-label', 'Close menu')
  } else {
    // Hide the menu again.
    mobileMenu.classList.add('is-hidden')

    // Show the hamburger icon and hide the "X" icon.
    openIcon.classList.remove('is-hidden')
    closeIcon.classList.add('is-hidden')

    // Tell screen readers that the menu is now closed.
    menuButton.setAttribute('aria-expanded', 'false')
    menuButton.setAttribute('aria-label', 'Open menu')
  }
}

// Only wire this up if the toggle button exists on the current page.
if (menuButton && mobileMenu) {
  // Clicking the hamburger button opens or closes the menu.
  menuButton.addEventListener('click', () => {
    if (mobileMenu.classList.contains('is-hidden')) {
      setMenu(true)
    } else {
      setMenu(false)
    }
  })

  // Tapping any link inside the menu closes it again automatically.
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false))
  })
}

// ===============================================================
// 2. Sidebar drawer (dashboard / admin panel pages)
// ===============================================================
const sidebarButton = document.getElementById('sidebar-toggle')
const sidebar = document.getElementById('panel-sidebar')
const sidebarBackdrop = document.getElementById('sidebar-overlay')
const sidebarCloseButton = document.getElementById('sidebar-close')

// Slides the drawer in/out and shows or hides the dark backdrop.
const setSidebar = (open) => {
  if (open) {
    // "is-open" slides the sidebar back to its visible position.
    sidebar.classList.add('is-open')

    // Show the dark backdrop behind the drawer.
    sidebarBackdrop.classList.remove('is-hidden')
  } else {
    // Push the sidebar back off the screen.
    sidebar.classList.remove('is-open')

    // Hide the dark backdrop.
    sidebarBackdrop.classList.add('is-hidden')
  }
}

// Only wire this up if these elements exist on the current page.
if (sidebarButton && sidebar && sidebarBackdrop) {
  // The hamburger button opens the drawer.
  sidebarButton.addEventListener('click', () => {
    if (sidebar.classList.contains('is-open')) {
      setSidebar(false)
    } else {
      setSidebar(true)
    }
  })

  // Clicking the dark backdrop closes the drawer.
  sidebarBackdrop.addEventListener('click', () => setSidebar(false))

  // The X button inside the drawer also closes it (if there is one).
  if (sidebarCloseButton) {
    sidebarCloseButton.addEventListener('click', () => setSidebar(false))
  }
}

// ===============================================================
// 3. Live search filter (panel pages)
// ===============================================================
// The search box has a data-target attribute that points to the
// cards / table rows we want to filter, for example:
//   data-target="#event-list > div, #registrations-tbody tr"
const searchInput = document.getElementById('panel-search')

if (searchInput && searchInput.dataset.target) {
  // Grab every element that should be filtered by the search box.
  const searchableItems = document.querySelectorAll(searchInput.dataset.target)

  searchInput.addEventListener('input', () => {
    // Convert the search text to lowercase so the match ignores case.
    const query = searchInput.value.trim().toLowerCase()

    searchableItems.forEach((item) => {
      const itemText = item.textContent.toLowerCase()

      // Show items that match the search, hide the ones that do not.
      if (query === '' || itemText.includes(query)) {
        item.classList.remove('is-hidden')
      } else {
        item.classList.add('is-hidden')
      }
    })
  })
}
