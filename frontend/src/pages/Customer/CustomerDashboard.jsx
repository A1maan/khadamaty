import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { featuredProviders, serviceCategories } from '../../data/customerData'
import './CustomerDashboard.css'

const CustomerDashboard = () => {
  return (
    <div className="customer-dashboard">
      <Sidebar userType="customer" />
      
      <main className="dashboard-content">
        <div className="dashboard-banner">
          <div className="search-bar">
            <ion-icon name="search-outline"></ion-icon>
            <input type="text" placeholder="Search services, providers, etc." />
          </div>
          <button className="btn-filter" aria-label="Filter">
            <ion-icon name="filter-outline"></ion-icon>
          </button>
        </div>

        <section className="featured-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Top Rated</p>
              <h2>Featured Providers</h2>
            </div>
            <Link to="/customer/browse" className="link-inline">
              Explore services <ion-icon name="arrow-forward"></ion-icon>
            </Link>
          </div>
          <div className="providers-grid">
            {featuredProviders.map((provider) => (
              <div key={provider.id} className="provider-card">
                <ion-icon name="person-circle-outline"></ion-icon>
                <div className="provider-info">
                  <h4>{provider.name}</h4>
                  <p>{provider.service}</p>
                  <span>{provider.rating} ★ • {provider.jobs} jobs</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="services-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Quick Actions</p>
              <h2>Browse Services</h2>
            </div>
            <Link to="/customer/browse" className="btn-secondary-link">
              View all
            </Link>
          </div>
          <div className="services-grid">
            {serviceCategories.map((category) => (
              <Link key={category.id} to={`/customer/browse/${category.id}`} className="service-card">
                <ion-icon name={category.icon}></ion-icon>
                <h3>{category.name}</h3>
                <p>{category.blurb}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default CustomerDashboard
