import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './LandingPage.css'

const pillars = [
  {
    title: 'What we do?',
    body: 'We connect households with vetted service providers for every day need—from plumbing to academic tutoring—in one trusted hub.'
  },
  {
    title: 'Our services',
    body: 'Curated categories with transparent pricing, on-time arrivals, and ratings that help you book with confidence every single time.'
  },
  {
    title: 'Who we cater to?',
    body: 'Busy families, young professionals, and independent providers looking to grow their reach within the Khadamaty community.'
  }
]

const stats = [
  { label: 'Verified Providers', value: '250+' },
  { label: 'Cities Served', value: '18' },
  { label: 'Avg. Rating', value: '4.8/5' }
]

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header showSignUp />
      
      <main className="landing-main">
        <section className="hero">
          <div className="hero-content">
            <span className="hero-pill">Trusted home & lifestyle services</span>
            <h1>Khadamaty</h1>
            <p className="hero-tagline">We make lives easier</p>
            <p className="hero-description">
              Book reliable providers, track every request, and keep your home running on autopilot with a single platform.
            </p>
            <div className="hero-actions">
              <Link to="/signup/selection" className="btn-primary">Get Started</Link>
              <Link to="/about" className="btn-secondary">How it works</Link>
            </div>
            <div className="hero-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-icon">
              <ion-icon name="thumbs-up-sharp"></ion-icon>
            </div>
            <div className="panel-title">Khadamaty</div>
            <p className="panel-text">
              “Are you a service provider or customer?” Choose your path and unlock the right dashboard experience instantly.
            </p>
            <div className="panel-actions">
              <Link to="/signup">I&apos;m a customer</Link>
              <Link to="/signup/provider">I&apos;m a provider</Link>
            </div>
          </div>
        </section>

        <section className="features">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="feature-card">
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default LandingPage
