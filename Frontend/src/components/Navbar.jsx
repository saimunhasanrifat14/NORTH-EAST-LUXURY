import ThemeToggle from './ThemeToggle'

const navItems = ['About', 'Services', 'Book Now']

const Navbar = () => {
  return (
    <header className="border-b border-GrayBorder bg-BGWhite/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-10">
        <a
          href="#home"
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

        <div className="flex items-center gap-3">
          
          <a
            href="#book-now"
            className="border rounded-full border-GrayBorder bg-BGLightGreen px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-TextDarkGray transition hover:bg-BGGray sm:px-5 sm:text-sm"
          >
            Reserve
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Navbar
