/* historical log for providers, mainly for auditing declines/completions */
import { useMemo, useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchProviderPastRequests } from '../../api/provider'
import './Provider.css'

const PastRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const providerId = localStorage.getItem('providerId')
        if (!providerId) {
          setError('Provider ID not found')
          setLoading(false)
          return
        }
        const data = await fetchProviderPastRequests(providerId)
        setRequests(data.requests || [])
      } catch (err) {
        setError(err.message || 'Failed to load requests')
      } finally {
        setLoading(false)
      }
    }
    loadRequests()
  }, [])

  const filteredRequests = useMemo(() => {
    if (!searchTerm.trim()) return requests
    const normalized = searchTerm.trim().toLowerCase()
    return requests.filter((request) =>
      `${request.customer || 'Unknown'} ${request.service || 'Unknown'}`.toLowerCase().includes(normalized)
    )
  }, [requests, searchTerm])

  return (
    <div className="provider-page">
      <Sidebar userType="provider" />

      <main className="provider-content">
        <div className="provider-header">
          <div>
            <p className="eyebrow">History</p>
            <h2>Past Requests</h2>
          </div>
          <div className="search-bar">
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="text"
              placeholder="Search past requests"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <section className="provider-cards">
          {loading && <div className="content-placeholder">Loading requests...</div>}
          {error && <div className="content-placeholder error">{error}</div>}

          {!loading && !error && filteredRequests.length === 0 && (
            <div className="content-placeholder">No past requests found.</div>
          )}

          {filteredRequests.map((request) => (
            <article key={request._id} className="request-card">
              <div className="request-header">
                <div>
                  <h3>{request.customer || 'Customer'}</h3>
                  <p>{request.service || 'Service'} </p>
                </div>
                <span className={`status-pill ${(request.status || '').toLowerCase()}`}>
                  {request.status}
                </span>
              </div>
              <div className="request-meta">
                <span>Date: {request.datetime ? new Date(request.datetime).toLocaleDateString() : 'N/A'}</span>
                {request.declineReason && <span>Reason: {request.declineReason}</span>}
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default PastRequests
