import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { serviceCategories } from '../../data/customerData'
import './CustomerPages.css'

const CustomerBrowseFilter = () => {
  return (
    <div className="customer-page">
      <Sidebar userType="customer" />
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
              <select>
                {serviceCategories.map((category) => (
                  <option key={category.id}>{category.name}</option>
                ))}
              </select>
            </label>

            <label>
              Price Range
              <select>
                <option>Any</option>
                <option>SAR 100 - 200</option>
                <option>SAR 200 - 400</option>
                <option>SAR 400+</option>
              </select>
            </label>

            <label>
              Availability
              <select>
                <option>Any Time</option>
                <option>Within 24 hours</option>
                <option>This Week</option>
                <option>Weekends</option>
              </select>
            </label>

            <label>
              Rating
              <input type="range" min="3" max="5" step="0.1" defaultValue="4.5" />
            </label>
          </div>

          <div className="booking-actions">
            <button className="btn-primary-solid">Apply Filters</button>
            <button className="btn-ghost">Clear All</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CustomerBrowseFilter
