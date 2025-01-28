import React from 'react';
import Button from '../ui/Button';
import SectionTitle from '../ui/SectionTitle';
import { MapPin } from 'lucide-react';

const tours = [
  {
    title: 'Enchanting Lake Bled and Bled Castle',
    destination: 'Lake Bled, Slovenia',
    image: 'https://tatianari.sirv.com/TOURS/BLED/BLED.jpg'
  },
  {
    title: 'Postojna Cave & Predjama Castle Tour',
    destination: 'Postojna, Slovenia',
    image: 'https://tatianari.sirv.com/TOURS/postojna/POS2.jpg'
  },
  {
    title: 'Rovinj: A Mediterranean Jewel',
    destination: 'Rovinj, Croatia',
    image: 'https://tatianari.sirv.com/TOURS/ROVINJ/port-rovinj-croatia-384489812.jpg'
  },
  {
    title: 'Roman Heritage in Pula',
    destination: 'Pula, Croatia',
    image: 'https://tatianari.sirv.com/TOURS/PULA/pula_arena-von-pula_01_foto-art-frank-heuer-752392495.jpg'
  },
  {
    title: 'Wine Tasting in Vipava Valley',
    destination: 'Vipava Valley, Slovenia',
    image: 'https://tatianari.sirv.com/TOURS/VIPAVA/VIPAVA3.jpg'
  },
  {
    title: 'Trieste & Miramare Castle Tour',
    destination: 'Trieste, Italy',
    image: 'https://tatianari.sirv.com/TOURS/MIRAMARE/MIRAMARE.jpg'
  }
];

export default function TourSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Discover Our Tours"
          subtitle="Experience the most beautiful destinations in Europe with our tours"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tours.map((tour, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tour.title}
                </h3>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{tour.destination}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            href="https://rideconnecttours.netlify.app"
            variant="primary"
            className="inline-flex items-center"
          >
            View All Tours
          </Button>
        </div>
      </div>
    </section>
  );
}