/*
 * SkillBridge — registration modal
 * --------------------------------
 * This file runs on all the listing pages (workshops, internships,
 * scholarships, hackathons, events and bootcamps).
 *
 * There are two modals:
 *   1. The details modal — shows the full information about an opportunity
 *      when the user clicks "View Details" (class .details-link).
 *   2. The registration modal — opens only when the user clicks "Apply Now"
 *      inside the details modal, and is pre-filled with the chosen event.
 *
 * The details come from data-* attributes on the link, for example:
 *   <a class="details-link" data-type="workshop" data-event="Web Development Bootcamp"
 *      data-description="..." data-duration="4 weeks" data-mode="Online" ...>
 *
 * The form is validated on the client for now. When you build your backend,
 * POST these fields (type, event, full_name, email, phone, college, consent)
 * to your server instead of showing the demo message.
 *
 * Styling note:
 * We only toggle helper classes here. The modal's look is split between the
 * HTML (Tailwind) and the .modal-overlay class in src/style.css.
 */

// ---------------------------------------------------------------
// 1. Find the modal and the things inside it
// ---------------------------------------------------------------
const modal = document.getElementById('register-modal')
const modalTitle = document.getElementById('register-modal-title')
const modalEvent = document.getElementById('register-modal-event')
const typeInput = document.getElementById('register-type')
const eventInput = document.getElementById('register-event')
const form = document.getElementById('register-form')
const closeButton = document.getElementById('register-modal-close')
const messageBox = document.getElementById('register-message')

// Short labels used in the modal title, keyed by the data-type value.
const typeLabels = {
  workshop: 'Workshop',
  internship: 'Internship',
  scholarship: 'Scholarship',
  hackathon: 'Hackathon',
  event: 'Event',
  bootcamp: 'Bootcamp',
  other: 'Event',
}

// ---------------------------------------------------------------
// 2. Small helpers
// ---------------------------------------------------------------

// Show a coloured notice inside the modal (blue = success, red = error).
const showMessage = (text, ok) => {
  // Remove any old colour so the classes never stack up.
  messageBox.classList.remove('message-info', 'message-error')

  if (!text) {
    messageBox.classList.add('is-hidden')
    messageBox.textContent = ''
    return
  }

  messageBox.classList.remove('is-hidden')

  if (ok) {
    messageBox.classList.add('message-info')
  } else {
    messageBox.classList.add('message-error')
  }

  messageBox.textContent = text
}

// Open the modal and fill it with the chosen event.
const openModal = (type, event) => {
  // Use the friendly label for the type, or just "Event" as a fallback.
  if (typeLabels[type]) {
    modalTitle.textContent = 'Register for ' + typeLabels[type]
  } else {
    modalTitle.textContent = 'Register for Event'
  }
  modalEvent.textContent = event

  // Store the chosen event in the hidden inputs so the backend can read them.
  typeInput.value = type
  eventInput.value = event

  // Start with a fresh form and no leftover messages.
  form.reset()
  messageBox.classList.add('is-hidden')

  // Show the modal (the .is-open class makes it display: flex) and lock
  // the page scrolling so the user can only interact with the modal.
  modal.classList.add('is-open')
  document.body.style.overflow = 'hidden'

  // Move the focus to the first input so the user can start typing right away.
  requestAnimationFrame(() => {
    const firstInput = modal.querySelector('input')
    if (firstInput) {
      firstInput.focus()
    }
  })
}

// Hide the modal again and let the page scroll normally.
const closeModal = () => {
  modal.classList.remove('is-open')
  document.body.style.overflow = ''
}

// ---------------------------------------------------------------
// 3. Wire up the page
// ---------------------------------------------------------------

// Every "Apply now" link opens the modal with its own event data.
document.querySelectorAll('.apply-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    openModal(link.dataset.type, link.dataset.event)
  })
})

// Only run the rest if the modal exists on this page.
if (modal) {
  // The X button closes the modal.
  closeButton.addEventListener('click', closeModal)

  // Clicking the dark area around the card also closes it.
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal()
    }
  })

  // Pressing the Escape (Esc) key closes whichever modal is open.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (detailsModal && detailsModal.classList.contains('is-open')) {
        closeDetails()
      } else {
        closeModal()
      }
    }
  })

  // Validate the form before "submitting" (demo only for now).
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    // Read and trim the values the user typed.
    const name = document.getElementById('register-name').value.trim()
    const email = document.getElementById('register-email').value.trim()
    const consent = document.getElementById('register-consent').checked

    // Run each check in order and stop at the first problem.
    if (!name) {
      showMessage('Please enter your full name.', false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage('Please enter a valid email address.', false)
      return
    }

    if (!consent) {
      showMessage('Please confirm you consent to being contacted.', false)
      return
    }

    // Everything looks good!
    // (Demo only — POST this form to your backend later.)
    showMessage('Application submitted! We will be in touch soon.', true)
    form.reset()

    // Give the user a moment to read the message, then close the modal.
    setTimeout(closeModal, 1800)
  })
}

// ---------------------------------------------------------------
// 4. Details modal (View Details first, then Apply)
// ---------------------------------------------------------------
// This modal shows the full information about an opportunity. The user
// decides if they want to apply, and only then the registration form opens.
const detailsModal = document.getElementById('details-modal')
const detailsBadge = document.getElementById('details-modal-badge')
const detailsTitle = document.getElementById('details-modal-title')
const detailsMeta = document.getElementById('details-modal-meta')
const detailsDescription = document.getElementById('details-modal-description')
const detailsDuration = document.getElementById('details-modal-duration')
const detailsMode = document.getElementById('details-modal-mode')
const detailsDeadline = document.getElementById('details-modal-deadline')
const detailsPerks = document.getElementById('details-modal-perks')
const detailsCloseButton = document.getElementById('details-modal-close')
const detailsCancelButton = document.getElementById('details-cancel-button')
const detailsApplyButton = document.getElementById('details-apply-button')

// Remember which opportunity the user is looking at so that the
// "Apply Now" button opens the correct registration form.
let chosenType = ''
let chosenEvent = ''

// Fill the details modal with the information from a card.
const openDetails = (link) => {
  // Copy the visible info straight from the card (title, badge, organisation).
  const card = link.closest('div.rounded-2xl')
  detailsBadge.textContent = card.querySelector('span.rounded-full').textContent
  detailsTitle.textContent = card.querySelector('h3').textContent
  detailsMeta.textContent = card.querySelector('p.mt-2').textContent

  // The extra details come from data-* attributes on the "View Details" link.
  detailsDescription.textContent = link.dataset.description
  detailsDuration.textContent = link.dataset.duration
  detailsMode.textContent = link.dataset.mode
  detailsDeadline.textContent = link.dataset.deadline

  // The perks are stored as one string separated by "|", so split them
  // into a small list of bullet points.
  detailsPerks.textContent = ''
  const perks = link.dataset.perks.split('|')
  perks.forEach((perk) => {
    const item = document.createElement('li')
    item.textContent = perk.trim()
    detailsPerks.appendChild(item)
  })

  // Save the choice so "Apply Now" opens the right form.
  chosenType = link.dataset.type
  chosenEvent = link.dataset.event

  // Show the details modal and lock the page scrolling.
  detailsModal.classList.add('is-open')
  document.body.style.overflow = 'hidden'
}

// Hide the details modal again.
const closeDetails = () => {
  detailsModal.classList.remove('is-open')
  document.body.style.overflow = ''
}

// Every "View Details" link opens the details modal with its own data.
document.querySelectorAll('.details-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    openDetails(link)
  })
})

// Only run the rest if the details modal exists on this page.
if (detailsModal) {
  // "Apply Now" closes the details and opens the registration form.
  detailsApplyButton.addEventListener('click', () => {
    closeDetails()
    openModal(chosenType, chosenEvent)
  })

  // "Maybe Later" and the X button both close the details.
  detailsCloseButton.addEventListener('click', closeDetails)
  detailsCancelButton.addEventListener('click', closeDetails)

  // Clicking the dark area around the card also closes it.
  detailsModal.addEventListener('click', (event) => {
    if (event.target === detailsModal) {
      closeDetails()
    }
  })
}
