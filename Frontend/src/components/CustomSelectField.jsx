import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { HiChevronDown } from 'react-icons/hi2'

const CustomSelectField = ({ label, name, placeholder, options, control, errors }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: `${label} is required` }}
      render={({ field }) => (
        <label className="block">
          <span className="mb-3 block text-sm font-medium uppercase tracking-[0.2em] text-TextGray">
            {label}
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              onBlur={() => {
                setTimeout(() => setIsOpen(false), 120)
              }}
              className="flex w-full items-center justify-between rounded-2xl border border-GrayBorder bg-BGWhite px-5 py-4 text-left text-sm text-TextBlack outline-none transition focus:border-TextDateColor"
            >
              <span className={field.value ? 'text-TextBlack' : 'text-TextGray'}>
                {field.value || placeholder}
              </span>
              <HiChevronDown
                className={`text-xl text-TextDarkGray transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl border border-GrayBorder bg-BGWhite shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onMouseDown={() => {
                      field.onChange(option)
                      setIsOpen(false)
                    }}
                    className="block w-full border-b border-GrayBorder px-5 py-3 text-left text-sm text-TextBlack transition last:border-b-0 hover:bg-BGLightGreen"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {errors[name] && (
            <p className="mt-2 text-sm text-amber-300">
              {errors[name]?.message}
            </p>
          )}
        </label>
      )}
    />
  )
}

export default CustomSelectField
