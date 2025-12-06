/* Create or edit a provider service with live preview in the sidebar */
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { serviceCategories } from '../../data/customerData'
import { createProviderService } from '../../api/provider'
import './Provider.css'

// Default shape for a new service
const blankService = {
  name: '',
  category: serviceCategories[0]?.id ?? 'plumbing',
  status: 'Draft',
  icon: 'construct-outline',
  description: '',
  price: '',
  priceType: 'Per visit',
  coverage: '',
  availability: '',
  responseTime: '',
  addOns: '',
  image: '',
}

// Icons the provider can pick from
const iconOptions = [
  'construct-outline',
  'bed-outline',
  'car-outline',
  'camera-outline',
  'sparkles-outline',
  'color-palette-outline',
]

// Show the price preview in a friendly format
const formatPrice = (price, priceType) => {
  if (price === '' || price === null || price === undefined) return 'Pricing TBD'
  const numeric = Number(price)
  const formatted = Number.isNaN(numeric) ? price : `SAR ${numeric.toLocaleString()}`
  return priceType ? `${formatted} / ${priceType}` : formatted
}

const ProviderServiceForm = ({ mode = 'create' }) => {
  const navigate = useNavigate()
  const { serviceId } = useParams()
  const providerId = typeof window !== 'undefined' ? window.localStorage.getItem('providerId') : null
  const isEdit = mode === 'edit'

  const [formData, setFormData] = useState(blankService)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  // Load existing service if in edit mode
  useState(() => {
    if (isEdit && serviceId) {
      import('../../api/provider').then(({ fetchProviderServiceById }) => {
        fetchProviderServiceById(serviceId)
          .then((res) => {
            const s = res?.service
            if (s) {
              setFormData({
                name: s.name || '',
                category: s.category || serviceCategories[0]?.id,
                status: s.status || 'Active', // assuming schema doesn't have status yet, default to Active
                icon: s.icon || 'construct-outline', // schema might not have icon
                description: s.description || '',
                price: s.price || '',
                priceType: s.priceType || 'Per visit',
                image: s.image || '',
                // These fields might not be in backend schema yet, so fallback
                coverage: s.coverage || '',
                availability: s.availability || '',
                responseTime: s.responseTime || '',
                addOns: s.addOns || '',
              })
            }
          })
          .catch((err) => setError('Failed to load service details.'))
      })
    }
  }, [isEdit, serviceId])


  // Generic change handler for inputs + selects + textareas
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Save a new service via the backend, then return to the list
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!providerId) {
      setError('Please sign in as a provider before creating services.')
      return
    }
    const payload = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      price: formData.price === '' ? undefined : Number(formData.price),
      priceType: formData.priceType,
      image: formData.image,
    }

    try {
      setIsSaving(true)
      setError('')

      if (isEdit) {
        const { updateProviderService } = await import('../../api/provider')
        await updateProviderService(providerId, serviceId, payload)
      } else {
        await createProviderService(providerId, payload)
      }

      navigate('/provider/services', { replace: true })
    } catch (err) {
      setError(err.message ?? 'Unable to save this service right now.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="provider-page">
      <Sidebar userType="provider" />

      <main className="provider-content">
        <div className="provider-header">
          <div>
            <p className="eyebrow">Services</p>
            <h2>Create Service</h2>
            <p>Describe your service so customers understand what you offer.</p>
          </div>
          <button type="button" className="btn-ghost" onClick={() => navigate('/provider/services')}>
            Back to list
          </button>
        </div>

        <div className="provider-form">
          {/* Main form on the left */}
          <form className="service-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-grid">
              <label>
                Service Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="CozyHome Clean"
                  required
                />
              </label>

              <label>
                Category
                <select name="category" value={formData.category} onChange={handleChange}>
                  {serviceCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Status
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                </select>
              </label>

              <label>
                Icon
                <select name="icon" value={formData.icon} onChange={handleChange}>
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Description
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Share what makes this service unique, what is included, and what customers can expect."
                required
              ></textarea>
            </label>

            <div className="form-grid">
              <label>
                Price (SAR)
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  min="0"
                  step="1"
                  onChange={handleChange}
                  placeholder="200"
                  required
                />
              </label>

              <label>
                Price Type
                <input
                  type="text"
                  name="priceType"
                  value={formData.priceType}
                  onChange={handleChange}
                  placeholder="Per hour"
                  required
                />
              </label>

              <label>
                Coverage Area
                <input
                  type="text"
                  name="coverage"
                  value={formData.coverage}
                  onChange={handleChange}
                  placeholder="Riyadh Metro Area"
                />
              </label>

              <label>
                Availability
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  placeholder="Within 24 hours"
                />
              </label>

              <label>
                Response Time
                <input
                  type="text"
                  name="responseTime"
                  value={formData.responseTime}
                  onChange={handleChange}
                  placeholder="2 hrs average"
                />
              </label>

              <label>
                Image URL
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/service.jpg"
                />
              </label>
            </div>

            <label>
              Add-ons & Notes
              <textarea
                name="addOns"
                rows="3"
                value={formData.addOns}
                onChange={handleChange}
                placeholder="List optional add-ons, materials coverage, or preparation notes."
              ></textarea>
            </label>

            <div className="form-actions">
              <button type="button" className="btn-ghost" onClick={() => navigate('/provider/services')}>
                Cancel
              </button>
              <button type="submit" className="btn-primary-solid" disabled={isSaving}>
                {isSaving ? 'Saving…' : 'Publish Service'}
              </button>
            </div>
          </form>

          {/* Live preview panel on the right */}
          <aside className="service-preview">
            <p className="eyebrow">Preview</p>
            <div className="service-card provider-card">
              <div className="service-head">
                <div className="service-icon">
                  <ion-icon name={formData.icon}></ion-icon>
                </div>
                <div>
                  <h3>{formData.name || 'Service Name'}</h3>
                  <p>
                    {formData.description ||
                      'Preview your description here to see how customers will read it.'}
                  </p>
                </div>
                <span className={`status-pill ${formData.status.toLowerCase()}`}>{formData.status}</span>
              </div>
              <div className="service-meta">
                <span>{formatPrice(formData.price, formData.priceType)}</span>
                <span>{formData.coverage || 'Coverage TBD'}</span>
                <span>{formData.availability || 'Availability TBD'}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default ProviderServiceForm
