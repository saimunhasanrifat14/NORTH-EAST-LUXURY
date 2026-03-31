import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import BookingSection from './components/BookingSection'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="min-h-screen bg-BGWhite text-TextBlack transition-colors duration-300">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_color-mix(in_srgb,var(--color-TextDateColor)_22%,transparent),_transparent_38%)]" />
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-BGWhite)_96%,transparent)_0%,color-mix(in_srgb,var(--color-BGWhite)_72%,transparent)_55%,transparent_100%)]" />
        <div className="relative">
          <Navbar />
          <HeroSection />
        </div>
      </div>

      <AboutSection />
      <ServicesSection />
      <BookingSection />
      <Footer />
    </div>
  )
}

export default App
