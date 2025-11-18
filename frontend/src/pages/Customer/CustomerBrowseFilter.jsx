import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
const CustomerBrowseFilter = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState(searchParams.get('category') ?? 'all')
  const [priceRange, setPriceRange] = useState(searchParams.get('priceRange') ?? 'any')
  const [availability, setAvailability] = useState(searchParams.get('availability') ?? 'any')
  const hasRatingParam = searchParams.has('rating')
  const [rating, setRating] = useState(hasRatingParam ? Number(searchParams.get('rating')) : 4.5)
  const [ratingChanged, setRatingChanged] = useState(hasRatingParam)

  // This function will apply the form and navigate it as query
  const handleApply = () => {
    // only stuff params for actual filters so urls stay tidy
    const params = new URLSearchParams()
    if (category !== 'all') params.set('category', category)
    if (priceRange !== 'any') params.set('priceRange', priceRange)
    if (availability !== 'any') params.set('availability', availability)
    if (ratingChanged) params.set('rating', rating.toString())

    const query = params.toString()
    navigate(query ? `/customer/browse?${query}` : '/customer/browse')
  }
  // this function will claer the filters
  const handleClear = () => {
    setCategory('all')
    setPriceRange('any')
    setAvailability('any')
    setRating(4.5)
    setRatingChanged(false)
    navigate('/customer/browse')
  }

  return (
    <div className="customer-page">
      <main className="customer-content">
        <header className="customer-hero">
          <div>
            <p className="eyebrow">Filters</p>
            <h1>Refine Your Search</h1>
            <p>Pick a category, price range, and availability to narrow down the best providers.</p>
          </div>
          <Link to="/customer/browse" className="btn-secondary-link">
            Back to results
          </Link>
        </header>

        <div className="filter-panel">
          <div className="filter-grid">
            <label>
              
              Category
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="all">Any category</option>
                { // options to be populated when categories data is available
                }
              </select>
            </label>
            
            <label>
              Price Range
              <select value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
                <option value="any">Any</option>
                <option value="100-200">SAR 100 - 200</option>
                <option value="200-400">SAR 200 - 400</option>
                <option value="400+">SAR 400+</option>
              </select>
            </label>

            <label>
              Availability
              <select value={availability} onChange={(event) => setAvailability(event.target.value)}>
                <option value="any">Any Time</option>
                <option value="24h">Within 24 hours</option>
                <option value="week">This Week</option>
                <option value="weekend">Weekends</option>
              </select>
            </label>

            <label>
              Rating
              <div className="slider-field">
                <input
                  type="range"
                  min="3"
                  max="5"
                  step="0.1"
                  value={rating}
                  onChange={(event) => {
                    setRating(Number(event.target.value))
                    setRatingChanged(true)
                  }}
                />
                <span>{rating.toFixed(1)}+ stars</span>
              </div>
            </label>
          </div>
            {/* The user can either apply the filters he choses or clear all the filters */}
          <div className="booking-actions">
            <button type="button" className="btn-primary-solid" onClick={handleApply}>
              Apply Filters
            </button>
            <button type="button" className="btn-ghost" onClick={handleClear}>
              Clear All
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CustomerBrowseFilter
