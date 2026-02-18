import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faGlobe,
  faMedal,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons'

const FEATURES = [
  {
    icon: faBookOpen,
    title: 'Literary Excellence',
    description: 'Showcase alongside top publishers and connect with the best in the industry.',
  },
  {
    icon: faGlobe,
    title: 'Global Reach',
    description: 'Connect with international buyers and expand your market presence.',
  },
  {
    icon: faMedal,
    title: 'Prestigious Platform',
    description: 'Largest book fair in Sri Lanka with unmatched visibility and prestige.',
  },
  {
    icon: faShieldHalved,
    title: 'Secure Reservations',
    description: 'Easy online booking with QR codes for a hassle-free experience.',
  },
]

export default function Features() {
  return (
    <section className="bg-white py-16 md:py-24" id="features" aria-labelledby="features-heading">
      <div className="container mx-auto px-6">
        <h2 id="features-heading" className="text-[clamp(1.5rem,4vw,2rem)] font-bold text-[#1e3a5f] text-center mb-2">
          Why Participate
        </h2>
        <p className="text-center text-[#333] mb-8">
          Join Sri Lanka&apos;s premier literary event and grow your reach.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
          {FEATURES.map(({ icon, title, description }) => (
            <div key={title} className="bg-[#f5f5f5] rounded-[10px] p-6 border border-[#1e3a5f]/10 transition-all duration-200 hover:shadow-lg hover:border-[#c9a227]">
              <div className="w-10 h-10 flex items-center justify-center bg-[#1e3a5f] text-[#c9a227] rounded-lg text-lg mb-4">
                <FontAwesomeIcon icon={icon} aria-hidden />
              </div>
              <h3 className="text-[1.1rem] font-semibold text-[#1e3a5f] mb-2">{title}</h3>
              <p className="text-[0.95rem] text-[#333] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
