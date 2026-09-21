import { useEffect, useState } from 'react'
import './App.css'
import { AuthView } from './views/AuthView'

function csrfHeaders() {
  const token = document.cookie.split('; ').find((cookie) => cookie.startsWith('XSRF-TOKEN='))?.split('=').slice(1).join('=')
  return token ? { 'X-XSRF-TOKEN': decodeURIComponent(token) } : {}
}

function App() {
  const [user, setUser] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authMode, setAuthMode] = useState('login')
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/user', { credentials: 'include', headers: { Accept: 'application/json' } })
      .then((response) => response.ok ? response.json() : null)
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setCheckingAuth(false))
  }, [])

  useEffect(() => {
    if (!user) return
    fetch('/api/tasks', { credentials: 'include', headers: { Accept: 'application/json' } })
      .then((response) => response.json())
      .then(setTasks)
      .catch(() => setMessage('Unable to load tasks.'))
  }, [user])

  async function addTask(event) {
    event.preventDefault()
    if (!title.trim()) return
    const response = await fetch('/api/tasks', {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...csrfHeaders() },
      body: JSON.stringify({ title: title.trim() }),
    })
    const data = await response.json()
    if (!response.ok) { setMessage(data.message || 'Unable to add task.'); return }
    setTasks((current) => [data, ...current])
    setTitle('')
    setMessage('')
  }

  async function logout() {
    await fetch('/api/logout', { method: 'POST', credentials: 'include', headers: { Accept: 'application/json', ...csrfHeaders() } })
    setUser(null)
    setTasks([])
  }

  if (checkingAuth) return <div className="loading-screen">Loading your workspace...</div>
  if (!user) return <AuthView mode={authMode} navigateTo={setAuthMode} onAuthenticated={setUser} />

  return (
    <main className="task-page">
      <header className="task-header">
        <div><p className="eyebrow">Your workspace</p><h1>Task Manager</h1></div>
        <div className="user-menu"><span>{user.name}<small>{user.email}</small></span><button className="button button-small" onClick={logout}>Logout</button></div>
      </header>
      <section className="task-card">
        <form className="task-form" onSubmit={addTask}><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What needs doing?" aria-label="Task title" /><button className="button" type="submit">Add task <span>↗</span></button></form>
        {message && <p className="form-message" role="alert">{message}</p>}
        <ul className="task-list">{tasks.map((task) => <li key={task.id}><span className="task-check" />{task.title}</li>)}</ul>
        {!tasks.length && <p className="empty-state">Your task list is clear. Add something meaningful.</p>}
      </section>
    </main>
  )
}

export default App
