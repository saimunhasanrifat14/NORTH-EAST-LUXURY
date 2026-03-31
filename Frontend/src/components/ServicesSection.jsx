import SectionHeader from './SectionHeader'
import { HiOutlineShieldCheck } from 'react-icons/hi2'
import { PiAirplaneTiltLight, PiClockCountdownLight, PiChampagneLight } from 'react-icons/pi'

const services = [
  {
    title: 'Airport Transfers',
    description:
      'Smooth pickups and drop-offs with punctual chauffeurs, luggage assistance, and polished executive presentation.',
    icon: PiAirplaneTiltLight,
  },
  {
    title: 'Hourly Chauffeur',
    description:
      'Flexible premium transport for meetings, shopping, dining, and city-to-city movement on your schedule.',
    icon: PiClockCountdownLight,
  },
  {
    title: 'Special Events',
    description:
      'Elegant arrivals for weddings, galas, private dinners, and celebration nights that call for a luxury entrance.',
    icon: PiChampagneLight,
  },
  {
    title: 'Exclusive Protection',
    description:
      'Discreet, privacy-led transport experiences designed for VIP guests and clients who value comfort and confidence.',
    icon: HiOutlineShieldCheck,
  },
]

const ServicesSection = () => {
  return (
    <section id="services" className="border-t border-GrayBorder bg-BGGray px-4 py-18 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeader
          eyebrow="What We Offer"
          title="Our Services"
          description="Designed for clients who expect comfort, discretion, and a luxury standard that feels effortless from start to finish."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group rounded-[1.8rem] border border-GrayBorder bg-BGLightGreen p-7 transition hover:-translate-y-1 hover:border-TextDateColor"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-GrayBorder bg-BGWhite text-xl text-TextDarkGray">
                  <service.icon />
                </div>
                <div className="text-sm font-semibold tracking-[0.25em] text-TextDarkGray">
                  0{index + 1}
                </div>
              </div>
              <h3 className="mt-8 text-3xl text-TextBlack [font-family:'Cormorant_Garamond',serif]">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-TextGray">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
