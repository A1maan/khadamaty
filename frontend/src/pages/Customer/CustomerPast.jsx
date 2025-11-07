import Sidebar from '../../components/Sidebar/Sidebar'
import './CustomerDashboard.css'

const CustomerPast = () => (
  <div className="customer-dashboard">
    <Sidebar userType="customer" />
    <main className="dashboard-content">
      <section className="services-section">
        <h2>Past Requests</h2>
        <p>Completed bookings will appear here for quick re-booking.</p>
      </section>
    </main>
  </div>
)

export default CustomerPast
