import { useEffect, useState } from 'react'
import { FiBarChart2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getBookingOverview } from '../../lib/api'
import { clearStoredAuth } from '../../lib/auth'
import { STATUS_META } from '../components/dashboardConstants'

const defaultOverview = {
  totalBookings: 0,
  counts: {
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  },
  percentages: {
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  },
}

const CircleChart = ({ color, label, percentage, count }) => {
  const safePercentage = Math.max(0, Math.min(100, percentage || 0))
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  useEffect(() => {
    let frameId
    const animationDuration = 1200
    const animationStart = window.performance.now()

    setAnimatedPercentage(0)

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - animationStart) / animationDuration, 1)
      const easedProgress = 1 - (1 - progress) ** 3

      setAnimatedPercentage(Math.round(safePercentage * easedProgress))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate)
      }
    }

    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [safePercentage])

  const offset = circumference - (animatedPercentage / 100) * circumference

  return (
    <div className="rounded-[28px] border border-GrayBorder bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-TextBlack">{label}</p>
        <span className="text-xs uppercase tracking-[0.22em] text-TextGray">{count} bookings</span>
      </div>
      <div className="mt-5 flex justify-center">
        <div className="relative h-32 w-32">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r={radius} fill="none" stroke="#ece6dc" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 80ms linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold text-TextBlack">{animatedPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ title, value, helper, icon }) => {
  return (
    <div className="rounded-[28px] border border-GrayBorder bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-TextGray">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-TextBlack">{value}</p>
          <p className="mt-2 text-sm text-TextGray">{helper}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6f1e9] text-TextBlack">
          {icon}
        </div>
      </div>
    </div>
  )
}

const Overview = () => {
  const navigate = useNavigate()
  const [overview, setOverview] = useState(defaultOverview)
  const [isLoadingOverview, setIsLoadingOverview] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadOverview = async () => {
      setIsLoadingOverview(true)
      setErrorMessage('')

      try {
        const response = await getBookingOverview()
        if (isMounted && response?.data) {
          setOverview(response.data)
        }
      } catch (error) {
        if (error.status === 401 || error.message === 'No refresh token found') {
          clearStoredAuth()
          navigate('/login', { replace: true })
          return
        }

        if (isMounted) {
          setErrorMessage(error.message || 'Failed to load overview')
        }
      } finally {
        if (isMounted) {
          setIsLoadingOverview(false)
        }
      }
    }

    loadOverview()

    return () => {
      isMounted = false
    }
  }, [navigate])

  return (
    <section>
      <div className="flex flex-col gap-3 border-b border-GrayBorder pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-TextDateColor">Overview</p>
          <h2 className="mt-3 text-3xl font-semibold text-TextBlack">Dashboard summary</h2>
          <p className="mt-2 text-sm text-TextGray">
            A clean view of total bookings and booking status distribution.
          </p>
        </div>
      </div>

      {errorMessage ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Bookings"
          value={isLoadingOverview ? '...' : overview.totalBookings}
          helper="All booking requests in the system"
          icon={<FiBarChart2 className="text-xl" />}
        />
        <StatCard
          title="Pending Requests"
          value={isLoadingOverview ? '...' : overview.counts.pending}
          helper="Bookings waiting for confirmation"
          icon={<STATUS_META.pending.icon className="text-xl" />}
        />
        <StatCard
          title="Confirmed Requests"
          value={isLoadingOverview ? '...' : overview.counts.confirmed}
          helper="Bookings already confirmed"
          icon={<STATUS_META.confirmed.icon className="text-xl" />}
        />
        <StatCard
          title="Completed Requests"
          value={isLoadingOverview ? '...' : overview.counts.completed}
          helper="Trips finished successfully"
          icon={<STATUS_META.completed.icon className="text-xl" />}
        />
        <StatCard
          title="Cancelled Requests"
          value={isLoadingOverview ? '...' : overview.counts.cancelled}
          helper="Requests cancelled or closed"
          icon={<STATUS_META.cancelled.icon className="text-xl" />}
        />
      </div>

      <div className="mt-6 rounded-[28px] border border-GrayBorder bg-[#faf7f2] p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-TextBlack">Booking status circle chart</h3>
            <p className="mt-1 text-sm text-TextGray">
              Percentage of total bookings by each current status.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(STATUS_META).map(([status, meta]) => (
            <CircleChart
              key={status}
              label={meta.shortLabel}
              color={meta.color}
              percentage={overview.percentages[status]}
              count={overview.counts[status]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Overview
