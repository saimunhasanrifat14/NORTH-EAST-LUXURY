import { clearStoredAuth, getStoredAuth, setStoredAuth } from './auth'

const DEFAULT_API_BASE_URL = 'https://north-east-luxury-backend.onrender.com/api/v1'
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, '')

const buildHeaders = (headers = {}) => {
  const auth = getStoredAuth()
  const nextHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  }

  if (auth?.accessToken) {
    nextHeaders.Authorization = `Bearer ${auth.accessToken}`
  }

  return nextHeaders
}

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers: buildHeaders(options.headers),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(data?.message || 'Request failed')
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

export const loginAdmin = async ({ email, password }) => {
  const response = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  const authPayload = {
    admin: response?.data?.admin,
    accessToken: response?.data?.accessToken,
    refreshToken: response?.data?.refreshToken,
  }

  setStoredAuth(authPayload)
  return response
}

export const refreshAccessToken = async () => {
  const auth = getStoredAuth()

  if (!auth?.refreshToken) {
    throw new Error('No refresh token found')
  }

  const response = await request('/auth/refresh-token', {
    method: 'POST',
    headers: {},
    body: JSON.stringify({ refreshToken: auth.refreshToken }),
  })

  setStoredAuth({
    ...auth,
    accessToken: response?.data?.accessToken,
    refreshToken: response?.data?.refreshToken,
  })

  return response
}

export const getCurrentAdmin = async () => {
  try {
    return await request('/auth/me', { method: 'GET' })
  } catch (error) {
    if (error.status !== 401) {
      throw error
    }

    try {
      await refreshAccessToken()
      return request('/auth/me', { method: 'GET' })
    } catch (refreshError) {
      clearStoredAuth()
      throw refreshError
    }
  }
}

const createQueryString = (params) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && `${value}`.trim() !== '') {
      searchParams.set(key, value)
    }
  })

  return searchParams.toString()
}

export const getBookings = async ({
  page = 1,
  limit = 10,
  search = '',
  status = '',
  serviceType = '',
  vehicleType = '',
}) => {
  const queryString = createQueryString({
    page,
    limit,
    search,
    status,
    serviceType,
    vehicleType,
  })

  try {
    return await request(`/booking/getallbookings?${queryString}`, {
      method: 'GET',
    })
  } catch (error) {
    if (error.status !== 401) {
      throw error
    }

    try {
      await refreshAccessToken()
      return request(`/booking/getallbookings?${queryString}`, {
        method: 'GET',
      })
    } catch (refreshError) {
      clearStoredAuth()
      throw refreshError
    }
  }
}

export const getBookingOverview = async () => {
  try {
    return await request('/booking/overview', { method: 'GET' })
  } catch (error) {
    if (error.status !== 401) {
      throw error
    }

    try {
      await refreshAccessToken()
      return request('/booking/overview', { method: 'GET' })
    } catch (refreshError) {
      clearStoredAuth()
      throw refreshError
    }
  }
}

export const getSingleBooking = async (bookingId) => {
  try {
    return await request(`/booking/getsinglebooking/${bookingId}`, { method: 'GET' })
  } catch (error) {
    if (error.status !== 401) {
      throw error
    }

    try {
      await refreshAccessToken()
      return request(`/booking/getsinglebooking/${bookingId}`, { method: 'GET' })
    } catch (refreshError) {
      clearStoredAuth()
      throw refreshError
    }
  }
}

export const updateBookingStatus = async (bookingId, status) => {
  try {
    return await request(`/booking/updatestatus/${bookingId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
  } catch (error) {
    if (error.status !== 401) {
      throw error
    }

    try {
      await refreshAccessToken()
      return request(`/booking/updatestatus/${bookingId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
    } catch (refreshError) {
      clearStoredAuth()
      throw refreshError
    }
  }
}

export const logoutAdmin = async () => {
  try {
    await request('/auth/logout', { method: 'POST' })
  } finally {
    clearStoredAuth()
  }
}
