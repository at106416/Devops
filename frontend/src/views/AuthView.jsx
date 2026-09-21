import { authModes } from '../models/authModel'
import { useAuthController } from '../controllers/useAuthController'
import { Brand } from '../components/Brand'

export function AuthView({ mode, navigateTo, onAuthenticated }) {
  const content = authModes[mode]
  const { isSubmitting, message, submit } = useAuthController(mode, onAuthenticated)
  const isRegister = mode === 'register'

  return (
    <main className="auth-page">
      <section className="auth-form-panel">
        <Brand onClick={() => navigateTo('landing')} />
        <div className="auth-content">
          <button className="back-link" type="button" onClick={() => navigateTo('landing')}>← Back to home</button>
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className="auth-description">{content.description}</p>
          <form onSubmit={submit} noValidate>
            {isRegister && <label>Full name<input type="text" name="name" placeholder="Your name" required /></label>}
            <label>Email address<input type="email" name="email" placeholder="you@example.com" required /></label>
            <label>Password<input type="password" name="password" placeholder="At least 8 characters" minLength="8" required /></label>
            {isRegister && <label>Confirm password<input type="password" name="password_confirmation" placeholder="Repeat your password" minLength="8" required /></label>}
            <button className="button submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Working...' : content.submitLabel} <span aria-hidden="true">↗</span></button>
          </form>
          {message && <p className="form-message" role="status">{message}</p>}
          <p className="auth-switch">{content.switchPrompt} <button type="button" onClick={() => navigateTo(content.switchMode)}>{content.switchLabel}</button></p>
        </div>
      </section>
      <aside className="auth-aside"><div className="aside-orbit" aria-hidden="true"><span>✦</span></div><div><p className="eyebrow">A little more light</p><blockquote>“The best work happens when your attention has somewhere beautiful to land.”</blockquote><p className="aside-caption">Luma is a calmer home for your working life.</p></div><div className="aside-footer"><span>01</span><span>02</span><span>03</span></div></aside>
    </main>
  )
}
