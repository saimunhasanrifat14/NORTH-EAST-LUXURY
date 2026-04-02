import { useEffect, useState } from 'react'
import { FiFilter, FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getBookings } from '../../lib/api'
import { clearStoredAuth } from '../../lib/auth'
import {
  SERVICE_OPTIONS,
  STATUS_META,
  STATUS_OPTIONS,
  VEHICLE_OPTIONS,
} from '../components/dashboardConstants'

const formatDate = (value) => {
  if (!value) {
    return 'N/A'
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

const Bookings = () => {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalBookings: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  })
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    serviceType: '',
    vehicleType: '',
  })
  const [isLoadingBookings, setIsLoadingBookings] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadBookings = async () => {
      setIsLoadingBookings(true)
      setErrorMessage('')

      try {
        const response = await getBookings({
          page: pagination.page,
          limit: pagination.limit,
          ...filters,
        })

        if (!isMounted) {
          return
        }

        setBookings(response?.data?.bookings ?? [])
        setPagination((current) => ({
          ...current,
          ...(response?.data?.pagination ?? {}),
        }))
      } catch (error) {
        if (error.status === 401 || error.message === 'No refresh token found') {
          clearStoredAuth()
          navigate('/login', { replace: true })
          return
        }

        if (isMounted) {
          setErrorMessage(error.message || 'Failed to load bookings')
        }
      } finally {
        if (isMounted) {
          setIsLoadingBookings(false)
        }
      }
    }

    loadBookings()

    return () => {
      isMounted = false
    }
  }, [filters, navigate, pagination.limit, pagination.page])

  const handleFilterChange = (key, value) => {
    setPagination((current) => ({
      ...current,
      page: 1,
    }))
    setFilters((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > pagination.totalPages || nextPage === pagination.page) {
      return
    }

    setPagination((current) => ({
      ...current,
      page: nextPage,
    }))
  }

  const handleOpenBooking = (bookingId) => {
    navigate(`/dashboard/bookings/${bookingId}`)
  }

  return (
    <section>
      <div className="flex flex-col gap-3 border-b border-GrayBorder pb-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-TextDateColor">All Bookings</p>
          <h2 className="mt-3 text-3xl font-semibold text-TextBlack">Booking request list</h2>
          <p className="mt-2 text-sm text-TextGray">
            Search by customer name, email, or phone and filter by status, service, and vehicle.
          </p>
        </div>

        <div className="text-sm text-TextGray">
          Showing page {pagination.page} of {pagination.totalPages}
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
        <label className="relative block">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-TextGray" />
          <input
            type="text"
            value={filters.search}
            onChange={(event) => handleFilterChange('search', event.target.value)}
            placeholder="Search name, email, phone"
            className="w-full rounded-2xl border border-GrayBorder bg-[#faf7f2] px-11 py-3 text-sm outline-none transition focus:border-TextDateColor"
          />
        </label>

        <label className="relative block">
          <FiFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-TextGray" />
          <select
            value={filters.status}
            onChange={(event) => handleFilterChange('status', event.target.value)}
            className="w-full appearance-none rounded-2xl border border-GrayBorder bg-[#faf7f2] px-11 py-3 text-sm outline-none transition focus:border-TextDateColor"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="relative block">
          <FiFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-TextGray" />
          <select
            value={filters.serviceType}
            onChange={(event) => handleFilterChange('serviceType', event.target.value)}
            className="w-full appearance-none rounded-2xl border border-GrayBorder bg-[#faf7f2] px-11 py-3 text-sm outline-none transition focus:border-TextDateColor"
          >
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="relative block">
          <FiFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-TextGray" />
          <select
            value={filters.vehicleType}
            onChange={(event) => handleFilterChange('vehicleType', event.target.value)}
            className="w-full appearance-none rounded-2xl border border-GrayBorder bg-[#faf7f2] px-11 py-3 text-sm outline-none transition focus:border-TextDateColor"
          >
            {VEHICLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {errorMessage ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      ) : null}

      <div className="mt-6 hidden overflow-x-auto xl:block">
        <table className="min-w-full table-fixed border-separate border-spacing-y-3">
          <thead>
            <tr>
              {['Customer', 'Phone', 'Service', 'Vehicle', 'Pickup', 'Dropoff', 'Date', 'Request', 'Status'].map(
                (label) => (
                  <th
                    key={label}
                    className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-[0.2em] text-TextGray"
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {isLoadingBookings ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-sm text-TextGray">
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length ? (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="cursor-pointer bg-[#faf7f2] transition hover:bg-[#f3ede4]"
                  onClick={() => handleOpenBooking(booking._id)}
                >
                  <td className="rounded-l-2xl px-4 py-4 align-top">
                    <p className="text-sm font-semibold text-TextBlack">{booking.fullName}</p>
                    <p className="mt-1 truncate text-sm text-TextGray">{booking.email}</p>
                  </td>
                  <td className="px-4 py-4 align-top text-sm text-TextGray">{booking.phoneNumber}</td>
                  <td className="px-4 py-4 align-top text-sm text-TextBlack">{booking.serviceType}</td>
                  <td className="px-4 py-4 align-top text-sm text-TextBlack">{booking.vehicleType}</td>
                  <td
                    className="max-w-[180px] truncate px-4 py-4 align-top text-sm text-TextGray"
                    title={booking.pickupLocation}
                  >
                    {booking.pickupLocation}
                  </td>
                  <td
                    className="max-w-[180px] truncate px-4 py-4 align-top text-sm text-TextGray"
                    title={booking.dropoffLocation}
                  >
                    {booking.dropoffLocation}
                  </td>
                  <td className="px-4 py-4 align-top text-sm text-TextBlack">
                    <p>{formatDate(booking.date)}</p>
                    <p className="mt-1 text-TextGray">{booking.time}</p>
                  </td>
                  <td
                    className="max-w-[170px] truncate px-4 py-4 align-top text-sm text-TextGray"
                    title={booking.specialRequests || 'No special request'}
                  >
                    {booking.specialRequests || 'No special request'}
                  </td>
                  <td className="rounded-r-2xl px-4 py-4 align-top">
                    <span
                      className="inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize"
                      style={{
                        color: STATUS_META[booking.status]?.color || '#2d2017',
                        backgroundColor: `${STATUS_META[booking.status]?.color || '#2d2017'}18`,
                      }}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-sm text-TextGray">
                  No bookings found for the current search and filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 xl:hidden">
        {isLoadingBookings ? (
          <div className="rounded-2xl border border-GrayBorder bg-[#faf7f2] px-4 py-5 text-sm text-TextGray">
            Loading bookings...
          </div>
        ) : bookings.length ? (
          bookings.map((booking) => (
            <article
              key={booking._id}
              onClick={() => handleOpenBooking(booking._id)}
              className="cursor-pointer rounded-[26px] border border-GrayBorder bg-[#faf7f2] p-4 transition hover:bg-[#f3ede4]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold text-TextBlack">{booking.fullName}</h3>
                  <p className="mt-1 truncate text-sm text-TextGray">{booking.email}</p>
                </div>
                <span
                  className="inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize"
                  style={{
                    color: STATUS_META[booking.status]?.color || '#2d2017',
                    backgroundColor: `${STATUS_META[booking.status]?.color || '#2d2017'}18`,
                  }}
                >
                  {booking.status}
                </span>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-TextGray sm:grid-cols-2">
                <p>Phone: {booking.phoneNumber}</p>
                <p>Service: {booking.serviceType}</p>
                <p>Vehicle: {booking.vehicleType}</p>
                <p>Date: {formatDate(booking.date)}</p>
                <p className="truncate" title={booking.pickupLocation}>
                  Pickup: {booking.pickupLocation}
                </p>
                <p className="truncate" title={booking.dropoffLocation}>
                  Dropoff: {booking.dropoffLocation}
                </p>
                <p className="truncate sm:col-span-2" title={booking.specialRequests || 'No special request'}>
                  Request: {booking.specialRequests || 'No special request'}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-GrayBorder bg-[#faf7f2] px-4 py-5 text-sm text-TextGray">
            No bookings found for the current search and filters.
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-GrayBorder pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-TextGray">
          Total bookings: {pagination.totalBookings} | Total pages: {pagination.totalPages}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={!pagination.hasPrevPage}
            onClick={() => handlePageChange(pagination.page - 1)}
            className="rounded-xl border border-GrayBorder px-4 py-2 text-sm font-medium transition hover:bg-[#faf7f2] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-TextBlack">
            {pagination.page} / {pagination.totalPages}
          </span>
          <button
            type="button"
            disabled={!pagination.hasNextPage}
            onClick={() => handlePageChange(pagination.page + 1)}
            className="rounded-xl border border-GrayBorder px-4 py-2 text-sm font-medium transition hover:bg-[#faf7f2] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default Bookings
