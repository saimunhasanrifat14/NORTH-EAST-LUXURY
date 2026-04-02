const STORAGE_KEY = 'north-east-luxury-admin-auth'

export const getStoredAuth = () => {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)
    return rawValue ? JSON.parse(rawValue) : null
  } catch {
    return null
  }
}

export const setStoredAuth = (authData) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(authData))
}

export const clearStoredAuth = () => {
  window.localStorage.removeItem(STORAGE_KEY)
}
