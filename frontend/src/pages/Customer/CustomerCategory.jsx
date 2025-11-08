/* this page shows providers inside a single service category */
import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { serviceCategories } from '../../data/customerData'
import { useMockData } from '../../context/MockDataContext'
import './CustomerPages.css'

const CustomerCategory = () => {
  const { categoryId } = useParams()
  const { publicServices } = useMockData()
  const category = useMemo(
    () => serviceCategories.find((cat) => cat.id === categoryId) ?? serviceCategories[0],
    [categoryId]
  )
  const providers = publicServices.filter(
    (provider) => provider.category === category.id && provider.status !== 'Draft'
  )

  return (
    <div className="customer-page">
      <Sidebar userType="customer" />
      <main className="customer-content">
        <header className="customer-hero">
          <div>
            <p className="eyebrow">Browse</p>
            <h1>{category.name}</h1>
            <p>{category.blurb}</p>
          </div>
          <div className="category-actions">
            <Link to={`/customer/browse?category=${category.id}`} className="btn-secondary-link">
              Back to results
            </Link>
            <Link to="/customer/browse/filter" className="btn-secondary-link">
              Adjust filters
            </Link>
          </div>
        </header>

        <section className="provider-list">
          {providers.length === 0 && (
            <div className="empty-state">
              <ion-icon name="sparkles-outline"></ion-icon>
              <p>No providers listed for this category yet.</p>
              <Link to="/customer/browse" className="btn-primary-outline">
                Explore all services
              </Link>
            </div>
          )}

          {providers.map((provider) => (
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

export default CustomerCategory
