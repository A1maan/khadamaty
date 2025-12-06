// customer home hub with search, featured pros, and quick category links
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { serviceCategories } from '../../data/customerData'
import { fetchFeaturedProviders } from '../../api/customer'
import './CustomerDashboard.css'

const CustomerDashboard = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [featuredProviders, setFeaturedProviders] = useState([])
  const [loadingFeatured, setLoadingFeatured] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchFeaturedProviders({ signal: controller.signal })
      .then((data) => {
        const providers = (data?.providers ?? []).map(p => ({
          id: p._id ?? p.id,
          name: p.name,
          service: 'Service Provider', // We might need to fetch their top service or category
          rating: 4.9, // static for now as schema doesn't seem to have rating yet
          jobs: 0 // static for now
        }))
        setFeaturedProviders(providers)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') console.error('Failed to load featured', err)
      })
      .finally(() => setLoadingFeatured(false))

    return () => controller.abort()
  }, [])

  const handleSearch = (event) => { // This function is used for searching it will add the query to the URL
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('search', query.trim())
    navigate(params.size ? `/customer/browse?${params.toString()}` : '/customer/browse')
  }
  // This will be used to navigate for the filter element
  const goToFilters = () => navigate('/customer/browse/filter')

  return (
    <div className="customer-dashboard">
      <Sidebar userType="customer" />

      <main className="dashboard-content">
        <form className="dashboard-banner" onSubmit={handleSearch}>
          { // This form is for seaching, it will call the handleSearch function
          }
          <div className="search-bar">
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="text"
              placeholder="Search services, providers, etc."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <button type="button" className="btn-filter" aria-label="Filter" onClick={goToFilters}>
            { // This button will open the filters menu using the navigate function defined above
            }
            <ion-icon name="filter-outline"></ion-icon>
          </button>
        </form>

        <section className="featured-section">
          { // This section will sjow the featured providers and provide a button to directly open their servieces page
          }
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
            {loadingFeatured && <p>Loading featured providers...</p>}
            {!loadingFeatured && featuredProviders.length === 0 && <p>No featured providers yet.</p>}

            { // content will appear once provider data is available
            }
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
            { // content will appear once service categories are available
            }
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
