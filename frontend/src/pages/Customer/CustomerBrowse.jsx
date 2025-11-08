/* main browse grid with search, chips, and filter bar */
import { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { serviceCategories } from '../../data/customerData'
import { useMockData } from '../../context/MockDataContext'
import './CustomerPages.css'

const CustomerBrowse = () => {
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ?? '')
  const { publicServices } = useMockData()

  useEffect(() => {
    const incoming = searchParams.get('search') ?? ''
    setSearchTerm(incoming)
  }, [searchParams])

  const filters = useMemo(() => ({
    category: searchParams.get('category') ?? 'all',
    priceRange: searchParams.get('priceRange') ?? 'any',
    availability: searchParams.get('availability') ?? 'any',
    rating: Number(searchParams.get('rating') ?? 0),
  }), [searchParams])

  const priceCopy = {
    '100-200': 'SAR 100 - 200',
    '200-400': 'SAR 200 - 400',
    '400+': 'SAR 400+',
  }

  const availabilityCopy = {
    '24h': 'Within 24 hours',
    week: 'This Week',
    weekend: 'Weekends',
  }

  const filteredProviders = useMemo(() => (
    // run all filter rules plus the text search in one pass for now
    publicServices
      .filter((provider) => provider.status !== 'Draft')
      .filter((provider) => {
        if (filters.category !== 'all' && provider.category !== filters.category) return false
        if (filters.priceRange !== 'any' && provider.priceRange !== filters.priceRange) return false
        if (filters.availability !== 'any' && provider.availabilityTag !== filters.availability) return false
        if (filters.rating && provider.rating < filters.rating) return false
        if (searchTerm.trim()) {
          const normalized = searchTerm.trim().toLowerCase()
          const haystack = `${provider.name} ${provider.description}`.toLowerCase()
          if (!haystack.includes(normalized)) return false
        }
        return true
      })
  ), [publicServices, filters, searchTerm])

  const hasActiveFilters = filters.category !== 'all' || filters.priceRange !== 'any' || filters.availability !== 'any' || Boolean(filters.rating)

  const readableFilters = [
    filters.category !== 'all'
      ? `Category: ${serviceCategories.find((cat) => cat.id === filters.category)?.name ?? 'Custom'}`
      : null,
    filters.priceRange !== 'any' ? `Budget: ${priceCopy[filters.priceRange]}` : null,
    filters.availability !== 'any' ? `Availability: ${availabilityCopy[filters.availability]}` : null,
    filters.rating ? `Rating: ${filters.rating}+` : null,
  ].filter(Boolean)

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

        <div className="customer-toolbar">
          <div className="customer-search">
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="text"
              placeholder="Search by service or provider name"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <Link to="/customer/browse/filter" className="btn-primary-outline compact">
            Filters
          </Link>
        </div>

        <div className="category-chips">
          <Link to="/customer/browse" className="chip chip-link">
            <ion-icon name="grid-outline"></ion-icon>
            All Services
          </Link>
          {serviceCategories.map((category) => (
            <Link key={category.id} to={`/customer/browse/${category.id}`} className="chip chip-link">
              <ion-icon name={category.icon}></ion-icon>
              {category.name}
            </Link>
          ))}
        </div>

        {hasActiveFilters && (
          <div className="active-filter-bar">
            <div className="active-filter-list">
              {readableFilters.map((filterLabel) => (
                <span key={filterLabel}>{filterLabel}</span>
              ))}
            </div>
            <Link
              to="/customer/browse"
              className="btn-ghost compact"
              onClick={() => setSearchTerm('')}
            >
              Clear Filters
            </Link>
          </div>
        )}

        <section className="provider-list">
          {filteredProviders.length === 0 && (
            <div className="empty-state">
              <ion-icon name="sparkles-outline"></ion-icon>
              <p>No providers match your current filters. Try widening your search.</p>
              <Link
                to="/customer/browse"
                className="btn-primary-outline"
                onClick={() => setSearchTerm('')}
              >
                Reset filters
              </Link>
            </div>
          )}

          {filteredProviders.map((provider) => (
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
                  <span>{provider.availability}</span>
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
