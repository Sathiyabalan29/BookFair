import React from 'react';

const PRICING_TIERS = [
  {
    name: 'Small Stall',
    size: '3m × 3m',
    price: 'Rs. 50,000',
    description: 'Perfect for independent authors and small publishers.',
    features: [
      '1 Display Table',
      '2 Chairs',
      'Basic Lighting',
      'Listing in Fair Guide',
      '1 Exhibitor Pass'
    ],
    recommended: false
  },
  {
    name: 'Medium Stall',
    size: '4m × 4m',
    price: 'Rs. 85,000',
    description: 'Ideal for growing publishers with moderate inventory.',
    features: [
      '2 Display Tables',
      '4 Chairs',
      'Standard Lighting',
      'Power Outlet (5A)',
      'Quarter Page Ad in Guide',
      '3 Exhibitor Passes'
    ],
    recommended: true
  },
  {
    name: 'Large Stall',
    size: '6m × 4m',
    price: 'Rs. 150,000',
    description: 'Premium space for major publishers and large displays.',
    features: [
      '4 Display Tables',
      '6 Chairs',
      'Premium Lighting',
      'Multiple Power Outlets',
      'Half Page Ad in Guide',
      'VIP Lounge Access',
      '5 Exhibitor Passes'
    ],
    recommended: false
  },
];

export default function StallOptions() {
  return (
    <section id="stalls" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Exhibitor Packages</h2>
          <p className="text-gray-600 text-lg">
            Choose the perfect space to showcase your collection. All stalls include basic shell scheme construction and fascia board with your company name.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 border ${tier.recommended
                  ? 'border-accent ring-2 ring-accent/20'
                  : 'border-gray-100'
                }`}
            >
              {tier.recommended && (
                <div className="absolute top-0 right-0 bg-accent text-primary-dark text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                  POPULAR CHOICE
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-bold text-primary mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-primary-dark">{tier.price}</span>
                  <span className="text-gray-500 ml-2">/ event</span>
                </div>
                <div className="inline-block px-3 py-1 bg-blue-50 text-secondary text-sm font-semibold rounded-full mb-6">
                  {tier.size}
                </div>
                <p className="text-gray-600 mb-6 text-sm">
                  {tier.description}
                </p>

                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
