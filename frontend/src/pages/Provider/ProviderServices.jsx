/* provider control center for editing, duplicating, and pausing services */
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './Provider.css'

const ProviderServices = () => {
  const navigate = useNavigate()
  const { providerData, duplicateProviderService, toggleProviderServiceStatus, removeProviderService } = useMockData()
  const [searchTerm, setSearchTerm] = useState('')
  const filteredServices = useMemo(
    () =>
      providerData.services.filter((service) => {
        if (!searchTerm.trim()) return true
        const normalized = searchTerm.trim().toLowerCase()
        return [service.name, service.description].some((field) =>
          field.toLowerCase().includes(normalized)
        )
      }),
    [searchTerm, providerData.services]
  )

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
              <input
                type="text"
                placeholder="Search services"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn-primary-solid"
              onClick={() => navigate('/provider/services/new')}
            >
              Create New
            </button>
          </div>
        </div>

        <section className="provider-cards">
          {filteredServices.length === 0 && (
            <div className="content-placeholder">No services match your search.</div>
          )}

          {filteredServices.map((service) => (
            <article key={service.id} className="service-card provider-card">
              <div className="service-head">
                <div className="service-icon">
                  <ion-icon name={service.icon}></ion-icon>
                </div>
                <div className="service-body">
                  <h3 className="service-title" title={service.name}>{service.name}</h3>
                  <p className="service-description" title={service.description}>{service.description}</p>
                </div>
                <span className={`status-pill ${service.status.toLowerCase()}`}>
                  {service.status}
                </span>
              </div>
              <div className="service-meta">
                <span className="meta-item" title={service.pricing}>{service.pricing}</span>
                <span className="meta-item">Updated {service.updated}</span>
              </div>
              <div className="service-actions">
                <button
                  type="button"
                  className="btn-primary-outline"
                  onClick={() => navigate(`/provider/services/${service.id}/edit`)}
                  >
                    EDIT
                  </button>
                <button type="button" className="btn-ghost" onClick={() => duplicateProviderService(service.id)}>
                  DUPLICATE
                </button>
                <button type="button" className="btn-ghost" onClick={() => toggleProviderServiceStatus(service.id)}>
                  {service.status === 'Paused' ? 'RESUME' : 'PAUSE'}
                </button>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => {
                    if (window.confirm('remove this service from your catalog?')) {
                      removeProviderService(service.id)
                    }
                  }}
                >
                  DELETE
                </button>
                </div>
              </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default ProviderServices
