import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { serviceProviders, serviceCategories } from '../../data/customerData'
import './CustomerPages.css'

const CustomerBrowse = () => {
  return (
    <div className="customer-page">
      <Sidebar userType="customer" />
      <main className="customer-content">
        <header className="customer-hero">
          <div>
            <p className="eyebrow">Browse</p>
            <h1>Home Services</h1>
            <p>Pick a category, review providers, and request a booking in minutes.</p>
          </div>
          <Link to="/customer/browse/filter" className="btn-secondary-link">
            Adjust filters
          </Link>
        </header>

        <div className="category-chips">
          {serviceCategories.map((category) => (
            <button key={category.id} className="chip">
              <ion-icon name={category.icon}></ion-icon>
              {category.name}
            </button>
          ))}
        </div>

        <section className="provider-list">
          {serviceProviders.map((provider) => (
            <article key={provider.id} className="provider-row">
              <div className="provider-avatar">
                <ion-icon name="person-circle-outline"></ion-icon>
              </div>
              <div className="provider-summary">
                <h3>{provider.name}</h3>
                <p>{provider.description}</p>
                <div className="provider-meta">
                  <span>{provider.pricing}</span>
                  <span>{provider.rating} ★ / {provider.reviews} reviews</span>
                  <span>Demand: {provider.demand}</span>
                </div>
              </div>
              <Link to={`/customer/booking/${provider.id}`} className="btn-primary-outline">
                Book
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default CustomerBrowse
