import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAward,
  faBuilding,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

const STATS = [
  { icon: faAward, value: '25+', label: 'Years of Excellence' },
  { icon: faBuilding, value: '300+', label: 'Publishers Annually' },
  { icon: faUsers, value: '500K+', label: 'Visitors Each Year' },
]

export default function About() {
  return (
    <section className="bg-[#f5f5f5] py-16 md:py-24" id="about" aria-labelledby="about-heading">
      <div className="container mx-auto px-6">
        <h2 id="about-heading" className="text-[clamp(1.5rem,4vw,2rem)] font-bold text-[#1e3a5f] text-center mb-6">
          Sri Lanka&apos;s Premier Literary Celebration
        </h2>
        <div className="max-w-[720px] mx-auto mb-10 text-center">
          <p className="mb-4 text-[#333]">
            The Colombo International Bookfair has been the cornerstone of
            Sri Lanka&apos;s literary scene for over two decades. Organized by
            the Sri Lanka Book Publishers&apos; Association, this annual event
            brings together publishers, authors, and book lovers from across
            the island and beyond.
          </p>
          <p className="text-[#333]">
            Whether you&apos;re a publisher looking to showcase your latest
            titles, a vendor seeking new opportunities, or a visitor eager to
            discover new reads, the Colombo Bookfair 2026 offers a prestigious
            platform and an unforgettable experience at BMICH, Colombo.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {STATS.map(({ icon, value, label }) => (
            <div key={label} className="bg-white rounded-[10px] p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-[#1e3a5f] text-[#c9a227] rounded-full text-xl">
                <FontAwesomeIcon icon={icon} aria-hidden />
              </div>
              <span className="block text-[1.75rem] font-bold text-[#1e3a5f] mb-1">{value}</span>
              <span className="text-[0.9rem] text-[#333]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
