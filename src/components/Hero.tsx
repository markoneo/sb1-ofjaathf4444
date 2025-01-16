import React from 'react';
import { heroImages } from '../constants/images';
import Button from './ui/Button';
import { Search, Star } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1920")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '600px'
        }}
      >
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center text-white">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-shadow-lg">
          Smart Travel Solutions for Every Journey
        </h1>
        <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto text-shadow">
          Enjoy comfort and reliability with our private transfer service
        </p>
        
        {/* Search Engine Feature Description */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Search size={24} className="text-blue-400" />
            <Star size={24} className="text-yellow-400" />
          </div>
          <p className="text-lg text-white/90">
            Our intelligent search engine finds the perfect match for your journey, comparing top-rated drivers and best prices to generate personalized offers instantly.
          </p>
        </div>

        <Button href="#booking">
          Book Your Transfer
        </Button>
      </div>
    </div>
  );
}