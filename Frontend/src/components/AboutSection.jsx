const AboutSection = () => {
  return (
    <section id="about" className="border-t border-GrayBorder bg-BGWhite px-4 py-18 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[2rem] border border-GrayBorder bg-BGLightGreen p-3 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <img
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80"
            alt="Luxury cars lined up in a premium setting"
            className="h-[22rem] w-full rounded-[1.5rem] object-cover sm:h-[28rem] lg:h-[34rem]"
          />
          <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] border border-GrayBorder bg-[color-mix(in_srgb,var(--color-BGWhite)_86%,transparent)] p-5 backdrop-blur-md sm:inset-x-8 sm:bottom-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-TextDarkGray">
              Signature fleet
            </p>
            <p className="mt-3 text-xl text-TextBlack [font-family:'Cormorant_Garamond',serif] sm:text-2xl">
              Luxury SUVs, executive sedans, and statement arrivals tailored for
              every special journey.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.42em] text-TextDarkGray">
            About Us
          </p>
          <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-TextBlack sm:text-5xl [font-family:'Cormorant_Garamond',serif]">
            Crafted for clients who expect every mile to feel elevated.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-TextGray sm:text-lg">
            North East Luxury is built around comfort, timing, and presentation.
            From smooth airport receptions to polished evening arrivals, our
            service is designed to make every ride feel calm, refined, and
            memorable.
          </p>
          <p className="max-w-2xl text-base leading-8 text-TextGray sm:text-lg">
            We focus on premium vehicles, professional chauffeurs, and an overall
            experience that feels discreet yet impressive. This is placeholder copy
            for now, so you can easily replace it later with your own brand story.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.4rem] border border-GrayBorder bg-BGLightGreen p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-TextDarkGray">
                Fleet
              </p>
              <p className="mt-3 text-lg font-medium text-TextBlack">Luxury SUV & sedan</p>
            </div>
            <div className="rounded-[1.4rem] border border-GrayBorder bg-BGLightGreen p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-TextDarkGray">
                Service
              </p>
              <p className="mt-3 text-lg font-medium text-TextBlack">Private and punctual</p>
            </div>
            <div className="rounded-[1.4rem] border border-GrayBorder bg-BGLightGreen p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-TextDarkGray">
                Experience
              </p>
              <p className="mt-3 text-lg font-medium text-TextBlack">Elegant by design</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
