import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Dashboard from './dashboard/Dashboard'
import Overview from './dashboard/pages/Overview'
import Bookings from './dashboard/pages/Bookings'
import SingleBooking from './dashboard/pages/SingleBooking'

const App = () => {
  useEffect(() => {
    if (!document.documentElement.classList.contains('light') && !document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('light')
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="bookings/:bookingId" element={<SingleBooking />} />
      </Route>

      <Route path="/admin-panel" element={<Navigate to="/dashboard/overview" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
