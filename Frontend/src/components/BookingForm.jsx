import { useForm } from 'react-hook-form'
import LocationAutocomplete from './LocationAutocomplete'
import CustomSelectField from './CustomSelectField'

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
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = () => {}

  return (
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
            className="inline-flex w-full items-center cursor-pointer justify-center rounded-full bg-ButttonBG px-7 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-BGWhite transition hover:opacity-90 sm:w-auto"
          >
            Request Booking
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookingForm
