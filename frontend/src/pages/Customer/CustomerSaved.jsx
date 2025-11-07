import Sidebar from '../../components/Sidebar/Sidebar'
import './CustomerDashboard.css'

const CustomerSaved = () => (
  <div className="customer-dashboard">
    <Sidebar userType="customer" />
    <main className="dashboard-content">
      <section className="services-section">
        <h2>Saved Providers</h2>
        <p>Tap the heart icon inside browse results to save providers for later.</p>
      </section>
    </main>
  </div>
)

export default CustomerSaved
