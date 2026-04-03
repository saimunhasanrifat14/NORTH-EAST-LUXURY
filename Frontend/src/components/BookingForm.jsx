import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import LocationAutocomplete from './LocationAutocomplete'
import CustomSelectField from './CustomSelectField'

const DEFAULT_BOOKING_API_URL =
  'https://north-east-luxury-backend.onrender.com/api/v1/booking/createbooking'
const BOOKING_API_URL =
  (import.meta.env.VITE_BOOKING_API_URL ?? DEFAULT_BOOKING_API_URL).replace(/\/$/, '')

const topFields = [
  { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Smith' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'johnsmith@example.com' },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (212) 555-0199' },
]

const bottomFields = [
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'time', label: 'Time', type: 'time' },
  { name: 'passengers', label: 'Number Of Passengers', type: 'number', placeholder: '1' },
]

const selectFields = [
  {
    name: 'serviceType',
    label: 'Service Type',
    options: ['Airport', 'Hourly', 'Event', 'VIP'],
  },
  {
    name: 'vehicleType',
    label: 'Vehicle Type',
    options: ['Sedan', 'SUV', 'Luxury', 'Minivan'],
  },
]

const BookingForm = () => {
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    message: '',
  })

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (submitState.status === 'idle' || submitState.status === 'submitting') {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setSubmitState({
        status: 'idle',
        message: '',
      })
    }, 5000)

    return () => window.clearTimeout(timeoutId)
  }, [submitState])

  const onSubmit = async (formValues) => {
    setSubmitState({
      status: 'submitting',
      message: 'Sending your booking request...',
    })

    const payload = {
      fullName: formValues.fullName,
      email: formValues.email,
      phoneNumber: formValues.phone,
      serviceType: formValues.serviceType,
      vehicleType: formValues.vehicleType,
      pickupLocation: formValues.pickup,
      dropoffLocation: formValues.dropoff,
      date: formValues.date,
      time: formValues.time,
      passengers: Number(formValues.passengers),
      specialRequests: formValues.specialRequest || '',
    }

    try {
      const response = await fetch(BOOKING_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(result?.message || 'Unable to submit booking request right now.')
      }

      reset()
      setSubmitState({
        status: 'success',
        message: result?.message || 'Booking request submitted successfully.',
      })
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error.message || 'Unable to submit booking request right now.',
      })
    }
  }

  return (
    <>
      {submitState.status !== 'idle' && submitState.status !== 'submitting' && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
          <div
            className={`rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(0,0,0,0.16)] ${
              submitState.status === 'success' ? 'bg-green-600' : 'bg-amber-500'
            }`}
          >
            {submitState.message}
          </div>
        </div>
      )}

      <div className="rounded-[2rem] border border-GrayBorder bg-BGLightGreen p-6 sm:p-8 lg:p-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5 md:grid-cols-2">
            {topFields.map((field) => (
              <label key={field.name} className="block">
                <span className="mb-3 block text-sm font-medium uppercase tracking-[0.2em] text-TextGray">
                  {field.label}
                </span>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name, { required: `${field.label} is required` })}
                  className="w-full rounded-2xl border border-GrayBorder bg-BGWhite px-5 py-4 text-sm text-TextBlack outline-none transition placeholder:text-TextGray focus:border-TextDateColor"
                />
                {errors[field.name] && (
                  <p className="mt-2 text-sm text-amber-300">
                    {errors[field.name]?.message}
                  </p>
                )}
              </label>
            ))}

            <LocationAutocomplete
              label="Pick Up Location"
              name="pickup"
              placeholder="JFK Airport Terminal 4, New York, NY"
              control={control}
              errors={errors}
            />

            <LocationAutocomplete
              label="Drop Off Location"
              name="dropoff"
              placeholder="The Plaza Hotel, New York, NY"
              control={control}
              errors={errors}
            />

            {selectFields.map((field) => (
              <CustomSelectField
                key={field.name}
                label={field.label}
                name={field.name}
                placeholder={`Select ${field.label.toLowerCase()}`}
                options={field.options}
                control={control}
                errors={errors}
              />
            ))}

            {bottomFields.map((field) => (
              <label key={field.name} className="block">
                <span className="mb-3 block text-sm font-medium uppercase tracking-[0.2em] text-TextGray">
                  {field.label}
                </span>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name, { required: `${field.label} is required` })}
                  className="w-full rounded-2xl border border-GrayBorder bg-BGWhite px-5 py-4 text-sm text-TextBlack outline-none transition placeholder:text-TextGray focus:border-TextDateColor"
                />
                {errors[field.name] && (
                  <p className="mt-2 text-sm text-amber-300">
                    {errors[field.name]?.message}
                  </p>
                )}
              </label>
            ))}
          </div>

          <label className="block">
            <span className="mb-3 block text-sm font-medium uppercase tracking-[0.2em] text-TextGray">
              Special Request
            </span>
            <textarea
              rows="5"
              placeholder="Flight number, luggage details, child seat, or preferred vehicle style."
              {...register('specialRequest')}
              className="w-full rounded-[1.5rem] border border-GrayBorder bg-BGWhite px-5 py-4 text-sm text-TextBlack outline-none transition placeholder:text-TextGray focus:border-TextDateColor"
            />
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitState.status === 'submitting'}
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-ButttonBG px-7 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-BGWhite transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {submitState.status === 'submitting' ? 'Loading...' : 'Request Booking'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default BookingForm
