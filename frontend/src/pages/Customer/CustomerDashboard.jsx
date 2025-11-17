/* customer home hub with search, featured pros, and quick category links */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CustomerDashboard.css'

const CustomerDashboard = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleSearch = (event) => { /* This function is used for searching it will add the query to the URL*/
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('search', query.trim())
    navigate(params.size ? `/customer/browse?${params.toString()}` : '/customer/browse')
  }
    /*This will be used to navigate for the filter element */
  const goToFilters = () => navigate('/customer/browse/filter')

  return (
    <div className="customer-dashboard">
      
      <main className="dashboard-content">
        <form className="dashboard-banner" onSubmit={handleSearch}>
          {/* This form is for seaching, it will call the handleSearch function */}
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
            {/* This button will open the filters menu using the navigate function defined above*/}
            <ion-icon name="filter-outline"></ion-icon>
          </button>
        </form>

        <section className="featured-section">
          {/* This section will sjow the featured providers and provide a button to directly open their servieces page */}
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
            {/* content will appear once provider data is available */}
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
            {/* content will appear once service categories are available */}
          </div>
        </section>
      </main>
    </div>
  )
}

export default CustomerDashboard
