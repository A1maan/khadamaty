/* this is the master router wiring every page and role together */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CustomerDashboard from './pages/Customer/CustomerDashboard'
import CustomerBrowse from './pages/Customer/CustomerBrowse'

function App() {
  return (
    /* Added routes for my pages to see what I am doing and if there is any errors*/
  <Router>
    <Routes>
    
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/customer/browse" element={<CustomerBrowse />} />

    </Routes>
  </Router>
  )
}

export default App
