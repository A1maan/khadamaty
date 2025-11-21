/* historical log for providers, mainly for auditing declines/completions */
import { useMemo, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './Provider.css'

const PastRequests = () => {
  const { providerData } = useMockData()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRequests = useMemo(() => {
    if (!searchTerm.trim()) return providerData.pastRequests
    const normalized = searchTerm.trim().toLowerCase()
    return providerData.pastRequests.filter((request) =>
      `${request.customer} ${request.service}`.toLowerCase().includes(normalized)
    )
  }, [providerData.pastRequests, searchTerm])

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
          {filteredRequests.length === 0 && (
            <div className="content-placeholder">No past requests found.</div>
          )}

          {filteredRequests.map((request) => (
            <article key={request.id} className="request-card">
              <div className="request-header">
                <div>
                  <h3>{request.customer}</h3>
                  <p>{request.service}</p>
                </div>
                <span className={`status-pill ${request.status.toLowerCase()}`}>
                  {request.status}
                </span>
              </div>
              <div className="request-meta">
                <span>Date: {request.date}</span>
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
