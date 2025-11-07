import Sidebar from '../../components/Sidebar/Sidebar'
import './CustomerDashboard.css'

const CustomerActive = () => (
  <div className="customer-dashboard">
    <Sidebar userType="customer" />
    <main className="dashboard-content">
      <section className="services-section">
        <h2>Active Requests</h2>
        <p>You have no active requests yet. Browse services to start a new booking.</p>
      </section>
    </main>
  </div>
)

export default CustomerActive
