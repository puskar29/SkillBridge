// SkillBridge – login / signup page helpers (client-side only)

document.querySelectorAll('.password-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target)
    if (!input) return
    const show = input.type === 'password'
    input.type = show ? 'text' : 'password'
    btn.classList.toggle('text-brand', show)
    btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password')
    btn.querySelectorAll('svg').forEach((svg) => svg.classList.toggle('hidden'))
  })
})

function setError(input, message) {
  const wrapper = input.closest('label') || input.parentElement
  let error = wrapper.querySelector('.field-error')
  if (message) {
    input.classList.add('border-[#e23b3b]', 'ring-2', 'ring-[#e23b3b]/20')
    if (!error) {
      error = document.createElement('span')
      error.className = 'field-error text-[13px] font-medium text-[#e23b3b]'
      wrapper.appendChild(error)
    }
    error.textContent = message
  } else if (error) {
    input.classList.remove('border-[#e23b3b]', 'ring-2', 'ring-[#e23b3b]/20')
    error.remove()
  }
}

function showMessage(box, text, ok) {
  if (!text) {
    box.classList.add('hidden')
    box.textContent = ''
    return
  }
  box.classList.remove('hidden')
  box.className = box.className.replace(/bg-\[\w+\]\/10|text-\[\w+\]/g, '').trim()
  box.classList.add(ok ? 'bg-green-50' : 'bg-red-50', ok ? 'text-green-700' : 'text-red-600')
  box.textContent = text
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

const loginForm = document.getElementById('login-form')
if (loginForm) {
  const email = document.getElementById('login-email')
  const password = document.getElementById('login-password')
  const message = document.getElementById('login-message')

  email.addEventListener('input', () => setError(email, email.value && !validateEmail(email.value) ? 'Enter a valid email address.' : ''))
  password.addEventListener('input', () => setError(password, ''))

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let ok = true
    if (!email.value) {
      setError(email, 'Email is required.')
      ok = false
    } else if (!validateEmail(email.value)) {
      setError(email, 'Enter a valid email address.')
      ok = false
    }
    if (!password.value) {
      setError(password, 'Password is required.')
      ok = false
    } else if (password.value.length < 6) {
      setError(password, 'Password must be at least 6 characters.')
      ok = false
    }
    if (!ok) {
      showMessage(message, 'Please fix the highlighted fields above.', false)
      return
    }
    showMessage(message, 'Sign in successful! (Demo — connect a backend to authenticate.)', true)
    loginForm.reset()
  })
}

const signupForm = document.getElementById('signup-form')
if (signupForm) {
  const name = document.getElementById('signup-name')
  const email = document.getElementById('signup-email')
  const phone = document.getElementById('signup-phone')
  const password = document.getElementById('signup-password')
  const confirm = document.getElementById('signup-confirm')
  const terms = document.getElementById('signup-terms')
  const message = document.getElementById('signup-message')
  const strength = document.getElementById('signup-strength')

  const checks = [
    { test: (v) => v.length >= 8, label: 'at least 8 characters' },
    { test: (v) => /[a-z]/.test(v), label: 'a lowercase letter' },
    { test: (v) => /[A-Z]/.test(v), label: 'an uppercase letter' },
    { test: (v) => /\d/.test(v), label: 'a number' },
  ]

  function updateStrength() {
    const value = password.value
    if (!value) {
      strength.classList.add('hidden')
      return
    }
    const passed = checks.filter((c) => c.test(value)).length
    strength.classList.remove('hidden')
    if (passed <= 1) {
      strength.textContent = 'Weak password'
      strength.className = 'text-[13px] font-medium text-red-500'
    } else if (passed <= 3) {
      strength.textContent = 'Good password'
      strength.className = 'text-[13px] font-medium text-amber-500'
    } else {
      strength.textContent = 'Strong password'
      strength.className = 'text-[13px] font-medium text-green-600'
    }
  }

  name.addEventListener('input', () => setError(name, ''))
  email.addEventListener('input', () => setError(email, email.value && !validateEmail(email.value) ? 'Enter a valid email address.' : ''))
  phone.addEventListener('input', () => setError(phone, phone.value && !/^[+\d][\d\s()-]{6,}$/.test(phone.value) ? 'Enter a valid phone number.' : ''))
  password.addEventListener('input', () => {
    setError(password, '')
    updateStrength()
    if (confirm.value) {
      setError(confirm, password.value === confirm.value ? '' : 'Passwords do not match.')
    }
  })
  confirm.addEventListener('input', () => setError(confirm, password.value !== confirm.value ? 'Passwords do not match.' : ''))
  terms.addEventListener('change', () => setError(terms, ''))

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let ok = true
    if (!name.value) {
      setError(name, 'Full name is required.')
      ok = false
    }
    if (!email.value) {
      setError(email, 'Email is required.')
      ok = false
    } else if (!validateEmail(email.value)) {
      setError(email, 'Enter a valid email address.')
      ok = false
    }
    if (phone.value && !/^[+\d][\d\s()-]{6,}$/.test(phone.value)) {
      setError(phone, 'Enter a valid phone number.')
      ok = false
    }
    if (!password.value) {
      setError(password, 'Password is required.')
      ok = false
    } else if (checks.filter((c) => c.test(password.value)).length < 3) {
      setError(password, 'Use at least 8 characters with uppercase, lowercase, and a number.')
      ok = false
    }
    if (!confirm.value) {
      setError(confirm, 'Please confirm your password.')
      ok = false
    } else if (password.value !== confirm.value) {
      setError(confirm, 'Passwords do not match.')
      ok = false
    }
    if (!terms.checked) {
      setError(terms, 'Please accept the Terms of Service and Privacy Policy.')
      ok = false
    }
    if (!ok) {
      showMessage(message, 'Please fix the highlighted fields above.', false)
      return
    }
    showMessage(message, 'Account created! (Demo — connect a backend to finish registration.)', true)
    signupForm.reset()
    strength.classList.add('hidden')
  })
}
