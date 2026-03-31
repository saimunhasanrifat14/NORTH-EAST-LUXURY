import { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="flex h-[2.35rem] w-[4.8rem] items-center rounded-full border border-GrayBorder bg-BGLightGreen px-1.5 text-TextBlack transition hover:bg-BGGray cursor-pointer"
    >
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-ButttonBG text-BGWhite transition-transform duration-300 ${
          theme === 'light' ? 'translate-x-0' : 'translate-x-8'
        }`}
      >
        {theme === 'light' ? <FiSun className="text-base" /> : <FiMoon className="text-base" />}
      </div>
    </button>
  )
}

export default ThemeToggle
