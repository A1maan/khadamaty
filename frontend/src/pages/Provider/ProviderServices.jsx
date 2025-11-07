import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { myServices } from '../../data/providerData'
import './Provider.css'

const ProviderServices = () => {
  return (
    <div className="provider-page">
      <Sidebar userType="provider" />
      
      <main className="provider-content">
        <div className="provider-header">
          <div>
            <p className="eyebrow">Services</p>
            <h2>My Services</h2>
          </div>
          <div className="provider-actions">
            <div className="search-bar">
              <ion-icon name="search-outline"></ion-icon>
              <input type="text" placeholder="Search services" />
            </div>
            <button type="button" className="btn-primary-solid">
              Create New
            </button>
          </div>
        </div>

        <section className="provider-cards">
          {myServices.map((service) => (
            <article key={service.id} className="service-card provider-card">
              <div className="service-head">
                <div className="service-icon">
                  <ion-icon name={service.icon}></ion-icon>
                </div>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <span className={`status-pill ${service.status.toLowerCase()}`}>
                  {service.status}
                </span>
              </div>
              <div className="service-meta">
                <span>{service.pricing}</span>
                <span>Updated {service.updated}</span>
              </div>
              <div className="service-actions">
                <button className="btn-primary-outline">EDIT</button>
                <button className="btn-ghost">DUPLICATE</button>
                <button className="btn-ghost">PAUSE</button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default ProviderServices
