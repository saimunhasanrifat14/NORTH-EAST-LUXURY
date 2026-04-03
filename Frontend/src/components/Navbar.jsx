import { useEffect, useRef, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'

const navItems = ['About', 'Services', 'Book Now']

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navbarRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (!navbarRef.current?.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isMenuOpen])

  return (
    <header
      ref={navbarRef}
      className="sticky top-0 z-40 border-b border-GrayBorder bg-BGWhite/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <a
          href="#home"
          onClick={closeMenu}
          className="text-md font-medium tracking-[0.24em] text-TextBlack uppercase sm:text-xl"
        >
          North East <span className='text-TextDarkGray font-bold'>Luxury</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium tracking-[0.18em] text-TextGray transition hover:text-TextDarkGray"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#book-now"
            className="rounded-full border border-ButttonBG bg-ButttonBG px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-BGWhite transition hover:opacity-90 sm:px-5 sm:text-sm"
          >
            Reserve
          </a>
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-GrayBorder bg-BGLightGreen text-TextBlack transition hover:bg-BGGray md:hidden"
        >
          {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-GrayBorder bg-BGWhite px-4 py-4 shadow-[0_18px_40px_rgba(45,32,23,0.08)] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navItems.filter((item) => item !== 'Book Now').map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={closeMenu}
                className="rounded-2xl border border-transparent bg-BGLightGreen px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-TextDarkGray transition hover:border-GrayBorder hover:bg-BGGray"
              >
                {item}
              </a>
            ))}

            <div className="mt-1 flex items-center justify-between gap-3 rounded-[24px] border border-GrayBorder bg-BGLightGreen p-3">
              <a
                href="#book-now"
                onClick={closeMenu}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-ButttonBG bg-ButttonBG px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-BGWhite transition hover:opacity-90"
              >
                Reserve
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
