import { useEffect, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getCurrentAdmin, loginAdmin } from '../lib/api'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    let isMounted = true

    const verifyCurrentSession = async () => {
      try {
        await getCurrentAdmin()
        if (isMounted) {
          navigate('/dashboard/overview', { replace: true })
        }
      } catch {
        if (isMounted) {
          setIsCheckingAuth(false)
        }
      }
    }

    verifyCurrentSession()

    return () => {
      isMounted = false
    }
  }, [navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await loginAdmin(formData)
      navigate('/dashboard/overview', { replace: true })
    } catch (error) {
      setErrorMessage(error.message || 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-BGWhite px-6 text-TextBlack">
        <div className="rounded-3xl border border-GrayBorder bg-white px-8 py-10 text-sm shadow-sm">
          Checking admin session...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f1e8_0%,#fffaf3_100%)] px-6 py-10 text-TextBlack">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-GrayBorder bg-white shadow-[0_20px_60px_rgba(45,32,23,0.08)] lg:grid-cols-[1.1fr_0.9fr]">
          <section className="hidden bg-[#2d2017] px-10 py-12 text-[#f7f1e8] lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#c8a46b]">
                North East Luxury
              </p>
              <h1 className="mt-5 max-w-xs font-['Cormorant_Garamond',serif] text-5xl leading-tight">
                Admin access for bookings and operations.
              </h1>
            </div>

            <div className="space-y-4 text-sm text-[#efe3d2]">
              <p>Review recent bookings, monitor trip requests, and stay organized.</p>
              <p>Simple, clean, and focused dashboard for daily admin work.</p>
            </div>
          </section>

          <section className="px-6 py-8 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-TextDateColor">
                Admin Login
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-TextBlack">Sign in to dashboard</h2>
              <p className="mt-3 text-sm leading-6 text-TextGray">
                Use your admin email and password to open the booking dashboard.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-TextBlack">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-GrayBorder bg-BGLightGreen px-4 py-3 text-sm outline-none transition focus:border-TextDateColor"
                    placeholder="admin@example.com"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-TextBlack">Password</span>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-GrayBorder bg-BGLightGreen px-4 py-3 pr-12 text-sm outline-none transition focus:border-TextDateColor"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-TextGray transition hover:text-TextBlack"
                    >
                      {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                    </button>
                  </div>
                </label>

                {errorMessage ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {errorMessage}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-[#2d2017] px-4 py-3 text-sm font-semibold text-[#f7f1e8] transition hover:bg-[#443327] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Signing in...' : 'Login'}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
