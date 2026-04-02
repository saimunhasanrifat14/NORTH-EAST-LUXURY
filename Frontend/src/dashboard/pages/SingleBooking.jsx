import { useEffect, useState } from 'react'
import { FiArrowLeft, FiCalendar, FiClock, FiMapPin, FiPhone, FiUser } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleBooking, updateBookingStatus } from '../../lib/api'
import { clearStoredAuth } from '../../lib/auth'
import { STATUS_META, STATUS_OPTIONS } from '../components/dashboardConstants'

const formatDate = (value) => {
  if (!value) {
    return 'N/A'
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value))
}

const DetailCard = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-GrayBorder bg-[#faf7f2] p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-TextGray">{label}</p>
      <p className="mt-2 text-sm font-medium text-TextBlack break-words">{value || 'N/A'}</p>
    </div>
  )
}

const SingleBooking = () => {
  const navigate = useNavigate()
  const { bookingId } = useParams()
  const [booking, setBooking] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadBooking = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await getSingleBooking(bookingId)
        if (isMounted) {
          const nextBooking = response?.data ?? null
          setBooking(nextBooking)
          setStatusValue(nextBooking?.status ?? '')
        }
      } catch (error) {
        if (error.status === 401 || error.message === 'No refresh token found') {
          clearStoredAuth()
          navigate('/login', { replace: true })
          return
        }

        if (isMounted) {
          setErrorMessage(error.message || 'Failed to load booking')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadBooking()

    return () => {
      isMounted = false
    }
  }, [bookingId, navigate])

  const handleStatusUpdate = async (event) => {
    event.preventDefault()
    setStatusMessage('')

    if (!statusValue || statusValue === booking?.status) {
      return
    }

    setIsUpdatingStatus(true)

    try {
      const response = await updateBookingStatus(bookingId, statusValue)
      const updatedBooking = response?.data ?? booking
      setBooking(updatedBooking)
      setStatusValue(updatedBooking?.status ?? statusValue)
      setStatusMessage('Booking status updated successfully.')
    } catch (error) {
      if (error.status === 401 || error.message === 'No refresh token found') {
        clearStoredAuth()
        navigate('/login', { replace: true })
        return
      }

      setStatusMessage(error.message || 'Failed to update booking status.')
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  return (
    <section>
      <div className="flex flex-col gap-4 border-b border-GrayBorder pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate('/dashboard/bookings')}
            className="inline-flex items-center gap-2 rounded-xl border border-GrayBorder px-3 py-2 text-sm font-medium text-TextBlack transition hover:bg-[#faf7f2]"
          >
            <FiArrowLeft className="text-base" />
            Back To All Bookings
          </button> 

          <p className="mt-5 text-sm uppercase tracking-[0.32em] text-TextDateColor">Single Booking</p>
          <h2 className="mt-3 text-3xl font-semibold text-TextBlack">Booking details</h2>
          <p className="mt-2 text-sm text-TextGray">
            Full request information for the selected booking.
          </p>
        </div>

        {booking ? (
          <span
            className="inline-flex rounded-full px-4 py-2 text-sm font-semibold capitalize"
            style={{
              color: STATUS_META[booking.status]?.color || '#2d2017',
              backgroundColor: `${STATUS_META[booking.status]?.color || '#2d2017'}18`,
            }}
          >
            {booking.status}
          </span>
        ) : null}
      </div>

      {isLoading ? (
        <div className="mt-6 rounded-2xl border border-GrayBorder bg-[#faf7f2] px-5 py-6 text-sm text-TextGray">
          Loading booking details...
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      ) : null}

      {!isLoading && !errorMessage && booking ? (
        <div className="mt-6 space-y-6">

        

          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] border border-GrayBorder bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6f1e9] text-TextBlack">
                  <FiUser className="text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.22em] text-TextGray">Customer</p>
                  <h3 className="mt-2 text-2xl font-semibold text-TextBlack">{booking.fullName}</h3>
                  <p className="mt-2 break-words text-sm text-TextGray">{booking.email}</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm text-TextGray">
                    <FiPhone className="text-base" />
                    {booking.phoneNumber}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-GrayBorder bg-white p-5 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <div className="flex items-center gap-3 rounded-2xl bg-[#faf7f2] p-4">
                  <FiCalendar className="text-lg text-TextBlack" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-TextGray">Date</p>
                    <p className="mt-1 text-sm font-medium text-TextBlack">{formatDate(booking.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#faf7f2] p-4">
                  <FiClock className="text-lg text-TextBlack" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-TextGray">Time</p>
                    <p className="mt-1 text-sm font-medium text-TextBlack">{booking.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DetailCard label="Service Type" value={booking.serviceType} />
            <DetailCard label="Vehicle Type" value={booking.vehicleType} />
            <DetailCard label="Passengers" value={booking.passengers} />
            <DetailCard label="Booking ID" value={booking._id} />
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded-[28px] border border-GrayBorder bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f6f1e9]">
                  <FiMapPin className="text-lg text-TextBlack" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-TextGray">Pickup Location</p>
                  <p className="mt-1 text-sm font-medium text-TextBlack break-words">{booking.pickupLocation}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-GrayBorder bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f6f1e9]">
                  <FiMapPin className="text-lg text-TextBlack" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-TextGray">Dropoff Location</p>
                  <p className="mt-1 text-sm font-medium text-TextBlack break-words">{booking.dropoffLocation}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-GrayBorder bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-TextGray">Special Request</p>
            <p className="mt-3 text-sm leading-7 text-TextBlack break-words">
              {booking.specialRequests || 'No special request added for this booking.'}
            </p>
          </div>

          <div className="rounded-[28px] border border-GrayBorder bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-TextGray">Booking Status</p>
                <h3 className="mt-2 text-xl font-semibold text-TextBlack">Update current status</h3>
                <p className="mt-2 text-sm text-TextGray">
                  Change this booking status to pending, confirmed, completed, or cancelled.
                </p>
              </div>

              <form onSubmit={handleStatusUpdate} className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <select
                  value={statusValue}
                  onChange={(event) => setStatusValue(event.target.value)}
                  className="min-w-[220px] rounded-2xl border border-GrayBorder bg-[#faf7f2] px-4 py-3 text-sm outline-none transition focus:border-TextDateColor"
                >
                  {STATUS_OPTIONS.filter((option) => option.value).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  disabled={isUpdatingStatus || !statusValue || statusValue === booking.status}
                  className="rounded-2xl bg-[#2d2017] px-5 py-3 text-sm font-semibold text-[#f7f1e8] transition hover:bg-[#443327] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdatingStatus ? 'Updating...' : 'Update Status'}
                </button>
              </form>
            </div>

            {statusMessage ? (
              <div
                className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
                  statusMessage.includes('successfully')
                    ? 'border border-green-200 bg-green-50 text-green-700'
                    : 'border border-red-200 bg-red-50 text-red-600'
                }`}
              >
                {statusMessage}
              </div>
            ) : null}
          </div>
          
        </div>
      ) : null}
    </section>
  )
}

export default SingleBooking
