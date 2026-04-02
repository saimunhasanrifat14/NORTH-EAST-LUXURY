import {
  FiBarChart2,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiGrid,
  FiXCircle,
} from 'react-icons/fi'

export const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export const SERVICE_OPTIONS = [
  { value: '', label: 'All Services' },
  { value: 'Airport', label: 'Airport' },
  { value: 'Hourly', label: 'Hourly' },
  { value: 'Event', label: 'Event' },
  { value: 'VIP', label: 'VIP' },
]

export const VEHICLE_OPTIONS = [
  { value: '', label: 'All Vehicles' },
  { value: 'Sedan', label: 'Sedan' },
  { value: 'SUV', label: 'SUV' },
  { value: 'Luxury', label: 'Luxury' },
  { value: 'Minivan', label: 'Minivan' },
]

export const STATUS_META = {
  pending: {
    label: 'Pending Bookings',
    shortLabel: 'Pending',
    color: '#f59e0b',
    icon: FiClock,
  },
  confirmed: {
    label: 'Confirmed Bookings',
    shortLabel: 'Confirmed',
    color: '#10b981',
    icon: FiCheckCircle,
  },
  completed: {
    label: 'Completed Bookings',
    shortLabel: 'Completed',
    color: '#3b82f6',
    icon: FiCalendar,
  },
  cancelled: {
    label: 'Cancelled Bookings',
    shortLabel: 'Cancelled',
    color: '#ef4444',
    icon: FiXCircle,
  },
}

export const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Overview', icon: FiGrid },
  { id: 'bookings', label: 'All Bookings', icon: FiBarChart2 },
]
