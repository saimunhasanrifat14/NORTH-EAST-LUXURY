import BookingForm from './BookingForm'
import SectionHeader from './SectionHeader'

const BookingSection = () => {
  return (
    <section id="book-now" className="border-t border-GrayBorder bg-BGWhite px-4 py-18 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeader
          eyebrow="Book Your Journey"
          title="Reserve a refined ride tailored to your schedule."
          description="Share your route and travel preferences. This design-first form is ready for validation with React Hook Form and prepared for backend integration next."
        />

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="w-full">
            <BookingForm />
          </div>

          <aside className="hidden rounded-[2rem] border border-GrayBorder bg-BGLightGreen p-4 xl:block">
            <div className="relative h-full min-h-[42rem] overflow-hidden rounded-[1.6rem] border border-GrayBorder bg-BGWhite">
              <iframe
                title="Map preview"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.2591%2C40.4774%2C-73.7004%2C40.9176&layer=mapnik"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-[1.4rem] border border-GrayBorder bg-[color-mix(in_srgb,var(--color-BGWhite)_88%,transparent)] p-5 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-TextDarkGray">
                  Route Preview
                </p>
                <p className="mt-3 text-xl text-TextBlack [font-family:'Cormorant_Garamond',serif]">
                  A simple map panel for visual balance beside the booking form.
                </p>
                <p className="mt-2 text-sm leading-7 text-TextGray">
                  We can connect this to real pickup and drop-off data later when
                  the backend and maps flow are ready.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default BookingSection
