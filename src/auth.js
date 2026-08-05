/*
 * SkillBridge — Login & Sign Up helpers
 * -------------------------------------
 * This file is client-side only for now. It validates the login and
 * signup forms before anything is submitted and shows helpful messages
 * while the user types.
 *
 * Later you can connect it to your own backend (PHP / Java / Node) and
 * replace the "Demo" success messages with a real API call.
 *
 * Styling note:
 * We only toggle small helper classes (is-hidden, is-invalid, ...) here.
 * All the colours and sizes live in src/style.css.
 */

// ---------------------------------------------------------------
// 1. Show / hide the password with the little eye button
// ---------------------------------------------------------------
// A page can have more than one password field, so we find ALL the
// eye buttons at once and attach a listener to each one.
const toggleButtons = document.querySelectorAll('.password-toggle')

toggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Each button knows which input it belongs to through a data attribute.
    // In the HTML it looks like:  data-target="login-password"
    const targetId = button.dataset.target
    const passwordInput = document.getElementById(targetId)

    // If the input is missing, there is nothing to do.
    if (!passwordInput) return

    if (passwordInput.type === 'password') {
      // The password is hidden, so we show it as plain text.
      passwordInput.type = 'text'

      // Colour the button so the user can tell the password is visible.
      button.classList.add('password-visible')

      // Update the accessibility label for screen readers.
      button.setAttribute('aria-label', 'Hide password')
    } else {
      // The password is visible, so we hide it again.
      passwordInput.type = 'password'
      button.classList.remove('password-visible')
      button.setAttribute('aria-label', 'Show password')
    }

    // Swap the two icons: an open eye when visible, a crossed eye when hidden.
    const icons = button.querySelectorAll('svg')
    icons.forEach((icon) => icon.classList.toggle('is-hidden'))
  })
})

// ---------------------------------------------------------------
// 2. Small helpers used by the rest of the file
// ---------------------------------------------------------------

// Does the value look like a valid email address?
const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

// Does the value look like a valid phone number? (kept loose on purpose)
const isValidPhone = (value) => {
  return /^[+\d][\d\s()-]{6,}$/.test(value)
}

/*
 * Show an error under a form field (or remove it with an empty message).
 * The red border comes from the .is-invalid class in style.css, and the
 * message text from .field-error.
 */
const setError = (input, message) => {
  // The error message lives inside the same <label> that wraps the input.
  // If there is no <label>, we fall back to the input's parent element.
  let wrapper = input.closest('label')
  if (!wrapper) {
    wrapper = input.parentElement
  }
  let error = wrapper.querySelector('.field-error')

  if (message) {
    // 1. Turn the input border red so it stands out.
    input.classList.add('is-invalid')

    // 2. Create the message element only if it does not exist yet.
    if (!error) {
      error = document.createElement('span')
      error.className = 'field-error'
      wrapper.appendChild(error)
    }
    error.textContent = message
  } else {
    // An empty message means the field is fine now: remove the styles.
    input.classList.remove('is-invalid')
    if (error) {
      error.remove()
    }
  }
}

/*
 * Show a notice box on the page.
 *  - box  = the <div> that holds the message
 *  - text = what to display (an empty string hides the box)
 *  - ok   = true for a success (green) message, false for an error (red)
 */
const showMessage = (box, text, ok) => {
  // Clear any old colours first so they never pile up.
  box.classList.remove('message-success', 'message-error')

  if (!text) {
    box.classList.add('is-hidden')
    box.textContent = ''
    return
  }

  box.classList.remove('is-hidden')

  if (ok) {
    box.classList.add('message-success')
  } else {
    box.classList.add('message-error')
  }

  box.textContent = text
}

// ---------------------------------------------------------------
// 3. Login form
// ---------------------------------------------------------------
const loginForm = document.getElementById('login-form')

if (loginForm) {
  // Grab the fields we care about.
  const emailInput = document.getElementById('login-email')
  const passwordInput = document.getElementById('login-password')
  const messageBox = document.getElementById('login-message')

  // Give live feedback while the user types.
  emailInput.addEventListener('input', () => {
    const value = emailInput.value.trim()

    if (value !== '' && !isValidEmail(value)) {
      setError(emailInput, 'Enter a valid email address.')
    } else {
      setError(emailInput, '')
    }
  })

  passwordInput.addEventListener('input', () => setError(passwordInput, ''))

  // When the form is submitted we run our own checks first.
  loginForm.addEventListener('submit', (event) => {
    // preventDefault stops the page from reloading so we can handle it here.
    event.preventDefault()

    let formIsValid = true

    // Check the email.
    if (emailInput.value.trim() === '') {
      setError(emailInput, 'Email is required.')
      formIsValid = false
    } else if (!isValidEmail(emailInput.value)) {
      setError(emailInput, 'Enter a valid email address.')
      formIsValid = false
    }

    // Check the password.
    if (passwordInput.value === '') {
      setError(passwordInput, 'Password is required.')
      formIsValid = false
    } else if (passwordInput.value.length < 6) {
      setError(passwordInput, 'Password must be at least 6 characters.')
      formIsValid = false
    }

    // If anything failed, show one message and stop.
    if (!formIsValid) {
      showMessage(messageBox, 'Please fix the highlighted fields above.', false)
      return
    }

    // Everything looks good!
    // (Demo only — replace this with a call to your backend later.)
    showMessage(messageBox, 'Sign in successful! (Demo — connect a backend to authenticate.)', true)
    loginForm.reset()
  })
}

// ---------------------------------------------------------------
// 4. Sign up form
// ---------------------------------------------------------------
const signupForm = document.getElementById('signup-form')

if (signupForm) {
  const nameInput = document.getElementById('signup-name')
  const emailInput = document.getElementById('signup-email')
  const phoneInput = document.getElementById('signup-phone')
  const passwordInput = document.getElementById('signup-password')
  const confirmInput = document.getElementById('signup-confirm')
  const termsCheckbox = document.getElementById('signup-terms')
  const messageBox = document.getElementById('signup-message')
  const strengthBox = document.getElementById('signup-strength')

  // A list of rules a good password should pass. Each entry is a test
  // function that receives the password and returns true or false.
  const passwordRules = [
    { test: (value) => value.length >= 8, label: 'at least 8 characters' },
    { test: (value) => /[a-z]/.test(value), label: 'a lowercase letter' },
    { test: (value) => /[A-Z]/.test(value), label: 'an uppercase letter' },
    { test: (value) => /\d/.test(value), label: 'a number' },
  ]

  // Count how many rules a password passes, using a simple loop.
  const countPassedRules = (value) => {
    let count = 0
    passwordRules.forEach((rule) => {
      if (rule.test(value)) {
        count = count + 1
      }
    })
    return count
  }

  // Update the "Weak / Good / Strong" hint while the user types.
  const updatePasswordStrength = () => {
    const value = passwordInput.value

    // No password typed yet → hide the hint.
    if (!value) {
      strengthBox.classList.add('is-hidden')
      return
    }

    // How many rules does the current password pass?
    const passedRules = countPassedRules(value)

    // Reset the previous colour, then pick a new one.
    strengthBox.classList.remove('is-hidden', 'strength-weak', 'strength-good', 'strength-strong')

    if (passedRules <= 1) {
      strengthBox.textContent = 'Weak password'
      strengthBox.classList.add('strength-weak')
    } else if (passedRules <= 3) {
      strengthBox.textContent = 'Good password'
      strengthBox.classList.add('strength-good')
    } else {
      strengthBox.textContent = 'Strong password'
      strengthBox.classList.add('strength-strong')
    }
  }

  // Live validation while typing.
  nameInput.addEventListener('input', () => setError(nameInput, ''))

  emailInput.addEventListener('input', () => {
    const value = emailInput.value.trim()

    if (value !== '' && !isValidEmail(value)) {
      setError(emailInput, 'Enter a valid email address.')
    } else {
      setError(emailInput, '')
    }
  })

  phoneInput.addEventListener('input', () => {
    const value = phoneInput.value.trim()

    if (value !== '' && !isValidPhone(value)) {
      setError(phoneInput, 'Enter a valid phone number.')
    } else {
      setError(phoneInput, '')
    }
  })

  passwordInput.addEventListener('input', () => {
    setError(passwordInput, '')
    updatePasswordStrength()

    // If the user already typed a confirmation, re-check it too.
    if (confirmInput.value) {
      if (passwordInput.value === confirmInput.value) {
        setError(confirmInput, '')
      } else {
        setError(confirmInput, 'Passwords do not match.')
      }
    }
  })

  confirmInput.addEventListener('input', () => {
    if (passwordInput.value !== confirmInput.value) {
      setError(confirmInput, 'Passwords do not match.')
    } else {
      setError(confirmInput, '')
    }
  })

  termsCheckbox.addEventListener('change', () => setError(termsCheckbox, ''))

  // Validate everything when the form is submitted.
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let formIsValid = true

    if (nameInput.value.trim() === '') {
      setError(nameInput, 'Full name is required.')
      formIsValid = false
    }

    if (emailInput.value.trim() === '') {
      setError(emailInput, 'Email is required.')
      formIsValid = false
    } else if (!isValidEmail(emailInput.value)) {
      setError(emailInput, 'Enter a valid email address.')
      formIsValid = false
    }

    if (phoneInput.value && !isValidPhone(phoneInput.value)) {
      setError(phoneInput, 'Enter a valid phone number.')
      formIsValid = false
    }

    const passedPasswordRules = countPassedRules(passwordInput.value)

    if (passwordInput.value === '') {
      setError(passwordInput, 'Password is required.')
      formIsValid = false
    } else if (passedPasswordRules < 3) {
      setError(passwordInput, 'Use at least 8 characters with uppercase, lowercase, and a number.')
      formIsValid = false
    }

    if (confirmInput.value === '') {
      setError(confirmInput, 'Please confirm your password.')
      formIsValid = false
    } else if (passwordInput.value !== confirmInput.value) {
      setError(confirmInput, 'Passwords do not match.')
      formIsValid = false
    }

    if (!termsCheckbox.checked) {
      setError(termsCheckbox, 'Please accept the Terms of Service and Privacy Policy.')
      formIsValid = false
    }

    // If anything failed, show one message and stop.
    if (!formIsValid) {
      showMessage(messageBox, 'Please fix the highlighted fields above.', false)
      return
    }

    // Everything looks good!
    // (Demo only — replace this with a call to your backend later.)
    showMessage(messageBox, 'Account created! (Demo — connect a backend to finish registration.)', true)
    signupForm.reset()
    strengthBox.classList.add('is-hidden')
  })
}
