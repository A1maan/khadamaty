import Header from '../components/Header/Header'
import './StaticPages.css'

const faqs = [
  { q: 'How do I book a service?', a: 'Select a category, pick a date, and confirm your request from the customer dashboard.' },
  { q: 'How are providers verified?', a: 'Our admin team reviews every submission, IDs, and sample work before activation.' },
  { q: 'Can I switch roles later?', a: 'Yes. Use the Logout option, then create the appropriate account type from the landing page.' },
]

const HelpPage = () => (
  <div className="static-page">
    <Header showSignUp />
    <main className="static-main">
      <section className="static-hero">
        <p className="eyebrow">Help & FAQs</p>
        <h1>Your support hub.</h1>
        <p className="lead">
          Find quick answers or reach out to support@khadamaty.com for tailored assistance.
        </p>
      </section>

      <section className="static-grid">
        {faqs.map((item) => (
          <article key={item.q} className="static-card">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </article>
        ))}
      </section>
    </main>
  </div>
)

export default HelpPage
