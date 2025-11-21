/* about screen highlighting what khadamaty does */
import Header from '../components/Header/Header'
import './StaticPages.css'

const AboutPage = () => {
  const highlights = [
    'Trusted marketplace bridging customers and providers',
    'Transparent pricing and clear communication tools',
    'Verification and review loops to keep quality high',
  ]

  return (
    <div className="static-page">
      <Header showSignUp />
      <main className="static-main">
        <section className="static-hero">
          <p className="eyebrow">About Khadamaty</p>
          <h1>We connect busy households with reliable experts.</h1>
          <p className="lead">
            From home repairs to specialty services, Khadamaty streamlines booking, tracking, and rating every request.
          </p>
        </section>

        <section className="static-grid">
          {highlights.map((item) => (
            <article key={item} className="static-card">
              <p>{item}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default AboutPage
