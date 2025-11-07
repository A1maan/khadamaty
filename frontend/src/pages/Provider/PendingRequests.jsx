import Sidebar from '../../components/Sidebar/Sidebar'
import { pendingRequests } from '../../data/providerData'
import './Provider.css'

const PendingRequests = () => {
  return (
    <div className="provider-page">
      <Sidebar userType="provider" />
      
      <main className="provider-content">
        <div className="provider-header">
          <div>
            <p className="eyebrow">Requests</p>
            <h2>Pending Requests</h2>
          </div>
          <div className="search-bar">
            <ion-icon name="search-outline"></ion-icon>
            <input type="text" placeholder="Search requests" />
          </div>
        </div>

        <section className="provider-cards">
          {pendingRequests.map((request) => (
            <article key={request.id} className="request-card">
              <div className="request-header">
                <div>
                  <h3>{request.customer}</h3>
                  <p>{request.service}</p>
                </div>
                <span className="status-pill pending">Awaiting Response</span>
              </div>
              <div className="request-meta">
                <span>Date: {request.date}</span>
                <span>Time: {request.timeslot}</span>
                <span>Notes: {request.notes}</span>
              </div>
              <div className="request-actions">
                <button className="btn-primary-solid">ACCEPT</button>
                <button className="btn-ghost">DECLINE</button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default PendingRequests
