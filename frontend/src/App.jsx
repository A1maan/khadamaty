// this is the master router wiring every page and role together
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CustomerDashboard from './pages/Customer/CustomerDashboard'
import CustomerBrowse from './pages/Customer/CustomerBrowse'
import CustomerBrowseFilter from './pages/Customer/CustomerBrowseFilter'
import CustomerCategory from './pages/Customer/CustomerCategory'
import CustomerBooking from './pages/Customer/CustomerBooking'

function App() {
  // Added routes for my pages to see what I am doing and if there is any errors
  return (
  <Router>
    <Routes>
    
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/customer/browse" element={<CustomerBrowse />} />
        <Route path="/customer/browse/filter" element={<CustomerBrowseFilter />} />
        <Route path="/customer/browse/:categoryId" element={<CustomerCategory />} />
        <Route path="/customer/booking/:providerId" element={<CustomerBooking />} />

    </Routes>
  </Router>
  )
}

export default App
