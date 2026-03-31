import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from 'react-icons/hi2'

const Footer = () => {
  return (
    <footer className="border-t border-GrayBorder bg-BGWhite px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_1fr] lg:gap-16">
          <div className="space-y-5">
            <h3 className="text-3xl uppercase tracking-[0.04em] text-TextDateColor [font-family:'Cormorant_Garamond',serif] sm:text-[2.5rem]">
              North East Luxury
            </h3>
            <p className="max-w-md text-lg leading-9 text-TextGray">
              Premium Cadillac Escalade chauffeur services delivering luxury,
              comfort, and reliability across the East Coast.
            </p>
          </div>

          <div className="space-y-5">
            <h4 className="text-2xl text-TextBlack [font-family:'Cormorant_Garamond',serif]">
              Contact
            </h4>
            <div className="space-y-4 text-lg text-TextGray">
              <div className="flex items-center gap-4">
                <HiOutlinePhone className="text-2xl text-TextDateColor" />
                <span>+1 (212) 555-0199</span>
              </div>
              <div className="flex items-center gap-4">
                <HiOutlineEnvelope className="text-2xl text-TextDateColor" />
                <span>bookings@northeastluxury.com</span>
              </div>
              <div className="flex items-center gap-4">
                <HiOutlineMapPin className="text-2xl text-TextDateColor" />
                <span>Serving the East Coast, USA</span>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h4 className="text-2xl text-TextBlack [font-family:'Cormorant_Garamond',serif]">
              Hours
            </h4>
            <div className="space-y-3 text-lg text-TextGray">
              <p>Available 24/7</p>
              <p>Pre-booking recommended</p>
              <p>Last-minute requests welcome</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-GrayBorder pt-8 text-center">
          <p className="text-lg text-TextGray">
            © 2026 North East Luxury. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
