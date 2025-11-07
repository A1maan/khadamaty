import Sidebar from '../../components/Sidebar/Sidebar'
import { pastRequests } from '../../data/providerData'
import './Provider.css'

const PastRequests = () => (
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
          <input type="text" placeholder="Search past requests" />
        </div>
      </div>

      <section className="provider-cards">
        {pastRequests.map((request) => (
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
            </div>
          </article>
        ))}
      </section>
    </main>
  </div>
)

export default PastRequests
