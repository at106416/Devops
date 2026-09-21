import { useState } from 'react'

async function csrfCookie() {
  const response = await fetch('/sanctum/csrf-cookie', { credentials: 'include' })
  if (!response.ok) throw new Error('Unable to initialize secure authentication.')
}

function csrfHeaders() {
  const token = document.cookie.split('; ').find((cookie) => cookie.startsWith('XSRF-TOKEN='))?.split('=').slice(1).join('=')
  return token ? { 'X-XSRF-TOKEN': decodeURIComponent(token) } : {}
}

export function useAuthController(mode, onAuthenticated) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  async function submit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    const form = new FormData(event.currentTarget)
    const payload = {
      email: form.get('email'),
      password: form.get('password'),
      ...(mode === 'register' ? { name: form.get('name'), password_confirmation: form.get('password_confirmation') } : {}),
    }

    try {
      await csrfCookie()
      const response = await fetch('/api/' + mode, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...csrfHeaders() },
        body: JSON.stringify(payload),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        const errors = Object.values(data.errors || {}).flat()
        throw new Error(errors[0] || data.message || 'Authentication failed.')
      }
      onAuthenticated(data.user)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, message, submit }
}
