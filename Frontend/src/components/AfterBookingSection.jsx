import SectionHeader from './SectionHeader'

const steps = [
  {
    number: '01',
    title: 'Submit Your Booking Request',
    description:
      'Share your trip details, preferred vehicle, and any special requirements through our booking form.',
  },
  {
    number: '02',
    title: 'We Review And Confirm',
    description:
      'Our team checks availability and contacts you shortly to confirm your ride details and final arrangement.',
  },
  {
    number: '03',
    title: 'Your Chauffeur Is Scheduled',
    description:
      'Once confirmed, we finalize your reservation and prepare your chauffeur service for a smooth experience.',
  },
]

const AfterBookingSection = () => {
  return (
    <section className="border-t border-GrayBorder bg-BGWhite px-4 py-18 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeader
          eyebrow="After Booking"
          title="What Happens Next"
          description="From your request to final confirmation, here is how the process moves forward so you always know what to expect."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-[1.8rem] border border-GrayBorder bg-BGLightGreen p-7"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-TextDarkGray">
                {step.number}
              </p>
              <h3 className="mt-6 text-3xl text-TextBlack [font-family:'Cormorant_Garamond',serif]">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-TextGray">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AfterBookingSection
