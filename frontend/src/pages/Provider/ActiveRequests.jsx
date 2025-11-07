import Sidebar from '../../components/Sidebar/Sidebar'
import { activeRequests } from '../../data/providerData'
import './Provider.css'

const ActiveRequests = () => (
  <div className="provider-page">
    <Sidebar userType="provider" />
    
    <main className="provider-content">
      <div className="provider-header">
        <div>
          <p className="eyebrow">Requests</p>
          <h2>Active Requests</h2>
        </div>
        <div className="search-bar">
          <ion-icon name="search-outline"></ion-icon>
          <input type="text" placeholder="Search active requests" />
        </div>
      </div>

      <section className="provider-cards">
        {activeRequests.map((request) => (
          <article key={request.id} className="request-card">
            <div className="request-header">
              <div>
                <h3>{request.customer}</h3>
                <p>{request.service}</p>
              </div>
              <span className={`status-pill ${request.status.replace(' ', '').toLowerCase()}`}>
                {request.status}
              </span>
            </div>
            <div className="request-meta">
              <span>Date: {request.date}</span>
              <span>Time: {request.timeslot}</span>
            </div>
            <div className="request-actions">
              <button className="btn-primary-solid">Mark Completed</button>
              <button className="btn-ghost">Message</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  </div>
)

export default ActiveRequests
