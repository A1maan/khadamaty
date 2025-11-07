import Header from '../../components/Header/Header'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header showSignUp={true} />
      
      <main className="landing-main">
        <section className="hero">
          <div className="hero-icon">
            <ion-icon name="thumbs-up-sharp"></ion-icon>
          </div>
          <h1 className="hero-title">Khadamaty</h1>
          <p className="hero-subtitle">We make lives easier</p>
        </section>

        <section className="features">
          <div className="feature-card">
            <h3>What we Do?</h3>
            <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
          </div>

          <div className="feature-card">
            <h3>Our Services</h3>
            <div className="feature-placeholder"></div>
            <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
          </div>

          <div className="feature-card">
            <h3>Who we Cater to?</h3>
            <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage
