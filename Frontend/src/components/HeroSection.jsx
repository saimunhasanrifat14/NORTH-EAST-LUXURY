const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-BGWhite)_92%,transparent)_0%,color-mix(in_srgb,var(--color-BGWhite)_75%,transparent)_45%,color-mix(in_srgb,var(--color-BGWhite)_38%,transparent)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_color-mix(in_srgb,var(--color-TextDateColor)_20%,transparent),_transparent_32%)]" />

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-TextDarkGray sm:text-sm">
              Private chauffeur booking
            </p>
            <h1 className="max-w-4xl text-5xl leading-none font-semibold tracking-[-0.04em] text-HeroHeading sm:text-6xl lg:text-7xl [font-family:'Cormorant_Garamond',serif]">
              Arrive in elegance.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-HeroCopy sm:text-lg">
              North East Luxury curates refined journeys with discreet chauffeurs,
              polished vehicles, and a calm premium experience from first request
              to final arrival.
            </p>
            <p className="max-w-2xl text-sm leading-7 text-TextGray sm:text-base">
              For airport pickups, executive city travel, and unforgettable event
              arrivals, we bring together sophistication, punctuality, and comfort.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#book-now"
              className="inline-flex items-center justify-center rounded-full bg-ButttonBG px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-BGWhite transition hover:opacity-90"
            >
              Book Your Ride
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-GrayBorder bg-BGLightGreen/70 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-TextBlack transition hover:bg-BGGray"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
