import { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY

const buildUrl = (query) => {
  const params = new URLSearchParams({
    text: query,
    format: 'json',
    lang: 'en',
    limit: '6',
    filter: 'countrycode:us',
    apiKey: API_KEY,
  })

  return `https://api.geoapify.com/v1/geocode/autocomplete?${params.toString()}`
}

const LocationAutocomplete = ({ label, name, placeholder, control, errors, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [requestError, setRequestError] = useState('')
  const debounceRef = useRef(null)

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  const fetchSuggestions = async (query) => {
    const trimmedQuery = query.trim()

    if (!API_KEY) {
      setSuggestions([])
      setRequestError('Geoapify API key is missing.')
      return
    }

    if (trimmedQuery.length < 2) {
      setSuggestions([])
      setRequestError('')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setRequestError('')

    try {
      const response = await fetch(buildUrl(trimmedQuery))

      if (!response.ok) {
        throw new Error('Failed to fetch locations')
      }

      const data = await response.json()
      const nextSuggestions = (data.results || [])
        .map((item) => item.formatted)
        .filter(Boolean)

      setSuggestions(nextSuggestions)
    } catch {
      setSuggestions([])
      setRequestError('Unable to load location suggestions right now.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQueryChange = (value) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value)
    }, 350)
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: `${label} is required` }}
      render={({ field }) => {
        const value = field.value || ''

        return (
          <label className={`block ${className}`}>
            <span className="mb-3 block text-sm font-medium uppercase tracking-[0.2em] text-TextGray">
              {label}
            </span>

            <div className="relative">
              <input
                type="text"
                value={value}
                onChange={(event) => {
                  const nextValue = event.target.value
                  field.onChange(nextValue)
                  setIsOpen(true)
                  handleQueryChange(nextValue)
                }}
                onFocus={() => {
                  setIsOpen(true)
                  handleQueryChange(value)
                }}
                onBlur={() => {
                  setTimeout(() => setIsOpen(false), 120)
                }}
                placeholder={placeholder}
                autoComplete="off"
                className="w-full rounded-2xl border border-GrayBorder bg-BGWhite px-5 py-4 text-sm text-TextBlack outline-none transition placeholder:text-TextGray focus:border-TextDateColor"
              />

              {isOpen && (isLoading || requestError || suggestions.length > 0) && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl border border-GrayBorder bg-BGWhite shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                  {isLoading && (
                    <div className="px-5 py-3 text-sm text-TextGray">
                      Loading suggestions...
                    </div>
                  )}

                  {!isLoading && requestError && (
                    <div className="px-5 py-3 text-sm text-amber-500">
                      {requestError}
                    </div>
                  )}

                  {!isLoading &&
                    !requestError &&
                    suggestions.map((location) => (
                      <button
                        key={location}
                        type="button"
                        onMouseDown={() => {
                          field.onChange(location)
                          setIsOpen(false)
                        }}
                        className="block w-full border-b border-GrayBorder px-5 py-3 text-left text-sm text-TextBlack transition last:border-b-0 hover:bg-BGLightGreen"
                      >
                        {location}
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
        )
      }}
    />
  )
}

export default LocationAutocomplete
