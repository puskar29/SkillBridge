// SkillBridge – registration modal
// Loaded on the workshops, internships, and scholarships listing pages.
// Clicking a "Register now" / "Apply now" card link (class .apply-link)
// opens a form modal pre-filled with the chosen event.

const modal = document.getElementById('register-modal')
const modalTitle = document.getElementById('register-modal-title')
const modalEvent = document.getElementById('register-modal-event')
const modalTypeInput = document.getElementById('register-type')
const modalEventInput = document.getElementById('register-event')
const form = document.getElementById('register-form')
const closeBtn = document.getElementById('register-modal-close')
const message = document.getElementById('register-message')

const typeLabels = {
  workshop: 'Workshop',
  internship: 'Internship',
  scholarship: 'Scholarship',
  other: 'Event',
}

function showMessage(text, ok) {
  message.textContent = text
  message.classList.remove('hidden')
  message.classList.toggle('bg-avaborder', ok)
  message.classList.toggle('text-brand-dark', ok)
  message.classList.toggle('bg-red-50', !ok)
  message.classList.toggle('text-red-600', !ok)
}

function openModal(type, event) {
  modalTitle.textContent = `Register for ${typeLabels[type] || 'Event'}`
  modalEvent.textContent = event
  modalTypeInput.value = type
  modalEventInput.value = event
  form.reset()
  message.classList.add('hidden')
  modal.classList.remove('hidden')
  modal.classList.add('flex')
  document.body.style.overflow = 'hidden'
  requestAnimationFrame(() => modal.querySelector('input')?.focus())
}

function closeModal() {
  modal.classList.add('hidden')
  modal.classList.remove('flex')
  document.body.style.overflow = ''
}

document.querySelectorAll('.apply-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    openModal(link.dataset.type, link.dataset.event)
  })
})

if (modal) {
  closeBtn.addEventListener('click', closeModal)

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal()
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('register-name').value.trim()
    const email = document.getElementById('register-email').value.trim()
    const consent = document.getElementById('register-consent').checked

    if (!name) return showMessage('Please enter your full name.', false)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showMessage('Please enter a valid email address.', false)
    if (!consent) return showMessage('Please confirm you consent to being contacted.', false)

    showMessage('Application submitted! We will be in touch soon.', true)
    form.reset()
    setTimeout(closeModal, 1800)
  })
}
