import Sidebar from '../../components/Sidebar/Sidebar'
import './Provider.css'

const PendingRequests = () => {
  const requests = [
    {
      id: 1,
      service: 'Service Name',
      customer: 'Customer Name',
      date: 'XX/XX/XXXX',
      timeslot: 'XX:XX'
    },
    {
      id: 2,
      service: 'Service Name',
      customer: 'Customer Name',
      date: 'XX/XX/XXXX',
      timeslot: 'XX:XX'
    },
    {
      id: 3,
      service: 'Service Name',
      customer: 'Customer Name',
      date: 'XX/XX/XXXX',
      timeslot: 'XX:XX'
    },
    {
      id: 4,
      service: 'Service Name',
      customer: 'Customer Name',
      date: 'XX/XX/XXXX',
      timeslot: 'XX:XX'
    },
  ]

  return (
    <div className="provider-page">
      <Sidebar userType="provider" />
      
      <main className="provider-content">
        <div className="provider-header">
          <h2>Pending Requests</h2>
          <div className="search-bar">
            <ion-icon name="search-outline"></ion-icon>
            <input type="text" placeholder="search ..." />
          </div>
        </div>

        <div className="requests-grid">
          {requests.map((request) => (
            <div key={request.id} className="request-card">
              <ion-icon name="person-circle-outline" className="request-avatar"></ion-icon>
              
              <div className="request-info">
                <h3>{request.service}</h3>
                <p>{request.customer}</p>
                <p>Date: {request.date}</p>
                <p>Timeslot: {request.timeslot}</p>
              </div>

              <div className="request-actions">
                <button className="btn-accept">ACCEPT</button>
                <button className="btn-decline">DECLINE</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default PendingRequests
