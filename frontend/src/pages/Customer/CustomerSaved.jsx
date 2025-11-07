import Sidebar from '../../components/Sidebar/Sidebar'
import { featuredProviders } from '../../data/customerData'
import './CustomerPages.css'

const CustomerSaved = () => (
  <div className="customer-page">
    <Sidebar userType="customer" />
    <main className="customer-content">
      <header className="customer-hero">
        <div>
          <p className="eyebrow">Saved</p>
          <h1>Saved Providers</h1>
          <p>Quickly book your favorite pros again.</p>
        </div>
      </header>

      <section className="provider-list">
        {featuredProviders.map((provider) => (
          <article key={provider.id} className="provider-row">
            <div className="provider-avatar">
              <ion-icon name="person-circle-outline"></ion-icon>
            </div>
            <div className="provider-summary">
              <h3>{provider.name}</h3>
              <p>{provider.service}</p>
              <div className="provider-meta">
                <span>{provider.rating} ★</span>
                <span>{provider.jobs} jobs</span>
              </div>
            </div>
            <div className="booking-actions">
              <button className="btn-primary-solid">Book Again</button>
              <button className="btn-ghost">Remove</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  </div>
)

export default CustomerSaved
