import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getCurrentAdmin, logoutAdmin } from '../lib/api'
import { clearStoredAuth } from '../lib/auth'
import Sidebar from './components/Sidebar'

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [admin, setAdmin] = useState(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    let isMounted = true

    const verifyAndLoad = async () => {
      try {
        const adminResponse = await getCurrentAdmin()
        if (!isMounted) {
          return
        }

        setAdmin(adminResponse?.data)
        setIsAuthorized(true)
        setIsCheckingAuth(false)
      } catch {
        if (isMounted) {
          clearStoredAuth()
          setIsAuthorized(false)
          setIsCheckingAuth(false)
        }
      }
    }

    verifyAndLoad()

    return () => {
      isMounted = false
    }
  }, [])

  const handleLogout = async () => {
    await logoutAdmin()
    navigate('/login', { replace: true })
  }

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-BGWhite px-6 text-TextBlack">
        <div className="rounded-3xl border border-GrayBorder bg-white px-8 py-10 text-sm shadow-sm">
          Checking authorization...
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f6f2eb_0%,#fbf8f3_100%)] p-0 text-TextBlack">
      <div className="flex min-h-screen w-full flex-col gap-0 lg:flex-row">
        <Sidebar admin={admin} onLogout={handleLogout} />

        <main className="min-w-0 flex-1 bg-white p-5 sm:p-6 lg:p-8">
          <Outlet context={{ admin }} />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
