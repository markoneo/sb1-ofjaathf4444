import React, { useState } from 'react';
import Button from './ui/Button';
import PartnerApplicationForm from './partner/PartnerApplicationForm';

const partners = [
  {
    name: 'Booking.com',
    image: 'https://tatianari.sirv.com/marko%20LOGO%20PARTNERS/62c82369f058e2b89bce43ab-4067516832.png',
    url: 'https://booking.com'
  },
  {
    name: 'viator',
    image: 'https://tatianari.sirv.com/marko%20LOGO%20PARTNERS/6033e12ff82f810004782cc0-4274402750.png',
    url: 'https://www.viator.com'
  },
  {
    name: 'theeuroroadtrip',
    image: 'https://tatianari.sirv.com/marko%20LOGO%20PARTNERS/1684322241637-Transparentni%CC%81_PNG-156241542%20(1).png',
    url: 'https://www.theeuroroadtrip.eu'
  },
  {
    name: 'Connecto',
    image: 'https://tatianari.sirv.com/marko%20LOGO%20PARTNERS/connecto_multicolor_black_small-3839988896.png',
    url: 'https://connectotransfers.com'
  },
  {
    name: 'Kiwitaxi',
    image: 'https://tatianari.sirv.com/marko%20LOGO%20PARTNERS/kiwi-taxi-logo-vert-300x300-3021130569.png',
    url: 'https://kiwitaxi.com'
  },
  {
    name: 'Rideways',
    image: 'https://tatianari.sirv.com/marko%20LOGO%20PARTNERS/rideways-4019465219.png',
    url: 'https://rideways.com'
  },
  {
    name: 'TripAdvisor',
    image: 'https://tatianari.sirv.com/marko%20LOGO%20PARTNERS/tripadvisor-logo-png-tripadvisor-logo-png-and-vector-logo-img-4096x4096-1356357298.png',
    url: 'https://tripadvisor.com'
  },
  {
    name: 'TransferWay',
    image: 'https://tatianari.sirv.com/marko%20LOGO%20PARTNERS/3ddfbf45-cgrey4de-48a9-90c0-c0e09e7a2aad-removebg-preview.png',
    url: 'https://transferway.com'
  }
];

export default function PartnerSection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="partners" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We work with leading travel companies to provide you with the best service
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center mb-12">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[240px] h-[120px] flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
            >
              <img
                src={partner.image}
                alt={`${partner.name} logo`}
                className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
                loading="lazy"
              />
            </a>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setShowForm(true)}
            variant="secondary"
            className="border border-blue-600"
          >
            Become our partner
          </Button>
        </div>
      </div>

      {showForm && <PartnerApplicationForm onClose={() => setShowForm(false)} />}
    </section>
  );
}