import { featureItems } from '../models/authModel'
import { Brand } from '../components/Brand'

export function LandingView({ navigateTo }) {
  return (
    <main className="landing-page">
      <nav className="site-nav" aria-label="Main navigation">
        <Brand onClick={() => navigateTo('landing')} />
        <div className="nav-links">
          <a href="#principles">Principles</a>
          <button className="nav-login" type="button" onClick={() => navigateTo('login')}>Sign in</button>
          <button className="button button-small" type="button" onClick={() => navigateTo('register')}>Get started <span aria-hidden="true">↗</span></button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">A better way to work</p>
          <h1>Make space for <em>great</em> work.</h1>
          <p className="hero-description">Luma brings your tasks, ideas, and intentions into one clear, considered workspace.</p>
          <div className="hero-actions">
            <button className="button" type="button" onClick={() => navigateTo('register')}>Start for free <span aria-hidden="true">↗</span></button>
            <a className="text-link" href="#principles">See how it works <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-art" aria-label="A calm, organized task workspace preview" role="img">
          <div className="art-header"><span className="window-dot dot-red" /><span className="window-dot dot-yellow" /><span className="window-dot dot-green" /></div>
          <div className="art-body">
            <div className="art-sidebar"><span className="art-logo">L</span><span className="sidebar-line active" /><span className="sidebar-line" /><span className="sidebar-line short" /></div>
            <div className="art-main"><p className="art-kicker">Tuesday, September 24</p><h2>A day with intention</h2><div className="task-row done"><span className="check">✓</span><span>Review project direction</span><small>09:30</small></div><div className="task-row"><span className="check" /><span>Shape the first draft</span><small>11:00</small></div><div className="task-row"><span className="check" /><span>Share a thoughtful update</span><small>14:30</small></div></div>
          </div>
          <span className="art-note">3 of 5 complete</span>
        </div>
      </section>

      <section className="principles-section" id="principles">
        <div className="section-intro"><p className="eyebrow">The Luma approach</p><h2>Quiet tools for meaningful momentum.</h2></div>
        <div className="feature-grid">{featureItems.map((item) => <article className="feature-item" key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
      </section>

      <footer><Brand onClick={() => navigateTo('landing')} /><span>Designed for the work ahead.</span></footer>
    </main>
  )
}
