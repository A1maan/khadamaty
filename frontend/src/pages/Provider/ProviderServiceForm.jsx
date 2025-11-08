/* create or edit a provider service with live preview */
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { serviceCategories } from '../../data/customerData'
import { useMockData } from '../../context/MockDataContext'
import './Provider.css'

const blankService = {
  name: '',
  category: serviceCategories[0]?.id ?? 'plumbing',
  pricing: '',
  status: 'Draft',
  coverage: '',
  availability: '',
  responseTime: '',
  description: '',
  addOns: '',
  icon: 'construct-outline',
}

const iconOptions = [
  'construct-outline',
  'bed-outline',
  'car-outline',
  'camera-outline',
  'sparkles-outline',
  'color-palette-outline',
]

const ProviderServiceForm = ({ mode = 'create' }) => {
  const navigate = useNavigate()
  const { serviceId } = useParams()
  const { providerData, upsertProviderService } = useMockData()
  const isEdit = mode === 'edit'
  const existingService = useMemo(
    () => providerData.services.find((service) => service.id === serviceId),
    [providerData.services, serviceId]
  )

  if (isEdit && !existingService) {
    return (
      <div className="provider-page">
        <Sidebar userType="provider" />
        <main className="provider-content">
          <div className="content-placeholder">
            The service you are looking for does not exist.
            <button type="button" className="btn-primary-outline" onClick={() => navigate('/provider/services')}>
              Back to services
            </button>
          </div>
        </main>
      </div>
    )
  }

  const [formData, setFormData] = useState(
    isEdit && existingService
      ? {
          ...existingService,
          addOns: existingService.addOns ?? '',
        }
      : blankService
  )
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSaving(true)
    upsertProviderService(isEdit ? existingService.id : null, formData)
    setTimeout(() => {
      setIsSaving(false)
      navigate('/provider/services', { replace: true })
    }, 300)
  }

  const headerCopy = isEdit ? 'Update copy, pricing, and availability for this listing.' : 'Describe your service so customers understand what you offer.'

  return (
    <div className="provider-page">
      <Sidebar userType="provider" />
      <main className="provider-content">
        <div className="provider-header">
          <div>
            <p className="eyebrow">Services</p>
            <h2>{isEdit ? 'Edit Service' : 'Create Service'}</h2>
            <p>{headerCopy}</p>
          </div>
          <button type="button" className="btn-ghost" onClick={() => navigate('/provider/services')}>
            Back to list
          </button>
        </div>

        <div className="provider-form">
          <form className="service-form" onSubmit={handleSubmit}>
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
                Pricing Summary
                <input
                  type="text"
                  name="pricing"
                  value={formData.pricing}
                  onChange={handleChange}
                  placeholder="Starts at SAR 200"
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
                {isSaving ? 'Saving…' : isEdit ? 'Save Changes' : 'Publish Service'}
              </button>
            </div>
          </form>

          <aside className="service-preview">
            <p className="eyebrow">Preview</p>
            <div className="service-card provider-card">
              <div className="service-head">
                <div className="service-icon">
                  <ion-icon name={formData.icon}></ion-icon>
                </div>
                <div>
                  <h3>{formData.name || 'Service Name'}</h3>
                  <p>{formData.description || 'Preview your description here to see how customers will read it.'}</p>
                </div>
                <span className={`status-pill ${formData.status.toLowerCase()}`}>
                  {formData.status}
                </span>
              </div>
              <div className="service-meta">
                <span>{formData.pricing || 'Pricing TBD'}</span>
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
