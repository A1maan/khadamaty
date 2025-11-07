import Sidebar from '../../components/Sidebar/Sidebar'
import './CustomerDashboard.css'

const CustomerDashboard = () => {
  const serviceCategories = [
    { name: 'Car Services', icon: 'car-outline' },
    { name: 'Photography Services', icon: 'camera-outline' },
    { name: 'Home Services', icon: 'bed-outline' },
    { name: 'Plumbing Services', icon: 'construct-outline' },
    { name: 'Technological Services', icon: 'cellular-outline' },
    { name: 'Academic Services', icon: 'business-outline' },
  ]

  const featuredProviders = [
    { name: 'Name', service: 'service' },
    { name: 'Name', service: 'service' },
    { name: 'Name', service: 'service' },
  ]

  return (
    <div className="customer-dashboard">
      <Sidebar userType="customer" />
      
      <main className="dashboard-content">
        <div className="dashboard-banner">
          <div className="search-bar">
            <ion-icon name="search-outline"></ion-icon>
            <input type="text" placeholder="search ..." />
          </div>
          <button className="btn-filter">
            <ion-icon name="filter-outline"></ion-icon>
          </button>
        </div>

        <section className="services-section">
          <h2>Browse Services</h2>
          <div className="services-grid">
            {serviceCategories.map((category, index) => (
              <div key={index} className="service-card">
                <ion-icon name={category.icon}></ion-icon>
                <h3>{category.name}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="featured-section">
          <h2>Featured Providers</h2>
          <div className="providers-grid">
            {featuredProviders.map((provider, index) => (
              <div key={index} className="provider-card">
                <ion-icon name="person-circle-outline"></ion-icon>
                <div className="provider-info">
                  <h4>{provider.name}</h4>
                  <p>{provider.service}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default CustomerDashboard
