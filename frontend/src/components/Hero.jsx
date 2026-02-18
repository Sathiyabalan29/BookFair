import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Path to your video
// Option 1: from public folder
const HERO_VIDEO = '/bookfair.mp4'; // Place the video in "public" folder

const EVENT_CARDS = [
  { label: 'Event Dates', value: 'September 15–25, 2026' },
  { label: 'Venue', value: 'BMICH, Colombo, Sri Lanka' },
  { label: 'Expected Visitors', value: '500,000+ Book Enthusiasts' },
];

export default function Hero() {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-center overflow-hidden"
      id="home"
    >
      {/* Video Background */}
      < video
        className="absolute inset-0 w-full h-full object-cover"
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay to darken video */}
      < div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/75 to-[#1e3a5f]/85" />

      {/* Content */}
      < div className="relative z-10 px-6 py-8 pb-12 container mx-auto" >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[clamp(1.75rem,5vw,2.75rem)] font-bold text-white mb-3 leading-[1.2]">
            Colombo International Bookfair 2026
          </h1>
          <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-white/95 mb-8 max-w-2xl mx-auto">
            Sri Lanka&apos;s largest literary celebration. Join us for a week of books, culture, and inspiration.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap gap-4 justify-center mb-10 flex-col sm:flex-row"
        >
          <Link to="/venue-map">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 text-base font-semibold rounded-lg transition-colors duration-200 border w-full sm:w-auto bg-[#c9a227] text-[#152a47] border-transparent hover:bg-[#d4af37] shadow-lg"
            >
              Reserve Your Stall
            </motion.button>
          </Link>


        </motion.div>

        {/* Event Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 max-w-[900px] mx-auto">
          {EVENT_CARDS.map(({ label, value }) => (
            <div
              key={label}
              className="bg-white/12 backdrop-blur-md border border-white/15 rounded-lg p-4 py-5 text-center"
            >
              <span className="block text-xs uppercase tracking-wider text-[#c9a227] mb-1">{label}</span>
              <span className="text-[0.95rem] font-semibold text-white">{value}</span>
            </div>
          ))}
        </div>
      </div >
    </section >
  );
}
