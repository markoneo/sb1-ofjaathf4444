import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, User, MessageSquare, CheckCircle, X } from 'lucide-react';
import FormInput from '../form/FormInput';
import Button from '../ui/Button';
import { StepTwoData } from '../../types/booking';
import LocationMap from './LocationMap';
import { calculatePrice } from '../../services/pricingService';

interface BookingStepTwoProps {
  formData: StepTwoData;
  locationData: {
    pickupAddress: string;
    dropoffAddress: string;
    priceEstimate?: {
      price: number;
      distance: number;
      duration: number;
      isCustomQuote: boolean;
    };
  };
  passengers: number;
  onChange: (data: Partial<StepTwoData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function BookingStepTwo({ 
  formData, 
  locationData,
  passengers,
  onChange, 
  onSubmit,
  onBack 
}: BookingStepTwoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(locationData.priceEstimate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit();
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      alert('There was an error submitting your booking. Please try again.');
    }
  };

  const vehicles = [
    {
      type: 'standard',
      name: 'Standard Car',
      image: 'https://tatianari.sirv.com/MARKO/Skoda-Octavia-PNG-Transparent-1775970813.png?w=300&h=200',
      maxPassengers: 4
    },
    {
      type: 'executive',
      name: 'Executive Car',
      image: 'https://tatianari.sirv.com/MARKO/audi-a7-2018.png?w=300&h=200',
      maxPassengers: 3
    },
    {
      type: 'van',
      name: 'Van',
      image: 'https://tatianari.sirv.com/MARKO/opel-vivaro-ready-2831090158.png?w=300&h=200',
      maxPassengers: 8
    },
    {
      type: 'minibus',
      name: 'Minibus',
      image: 'https://tatianari.sirv.com/MARKO/979f86245703bdf377eeb76804c724e5-996114475.png?w=300&h=200',
      maxPassengers: 16
    }
  ];

  // Update price when vehicle type changes
  const handleVehicleSelect = async (type: string) => {
    try {
      const newPrice = await calculatePrice(
        locationData.pickupAddress,
        locationData.dropoffAddress,
        passengers,
        type
      );
      setCurrentPrice(newPrice);
      onChange({ vehicleType: type });
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  // Initialize price on component mount
  useEffect(() => {
    setCurrentPrice(locationData.priceEstimate);
  }, [locationData.priceEstimate]);

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-4 relative">
          <button
            onClick={() => setShowSuccess(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Sent!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your booking request! We will contact you shortly with an offer.
          </p>
          <Button onClick={() => setShowSuccess(false)}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto relative">
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg font-semibold text-gray-900">Processing Your Booking</p>
            <p className="text-gray-600 mt-2">Please wait while we submit your request...</p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-center mb-6">Tell Us More About Your Trip</h2>

      {currentPrice && (
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Trip Summary</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">From:</span>
              <span className="text-blue-900 font-medium">{locationData.pickupAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">To:</span>
              <span className="text-blue-900 font-medium">{locationData.dropoffAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Distance:</span>
              <span className="text-blue-900 font-medium">{Math.round(currentPrice.distance)} km</span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-blue-100">
              <span className="text-blue-700 font-semibold">Total Price:</span>
              {currentPrice.isCustomQuote ? (
                <span className="text-blue-900 font-medium">Custom Quote</span>
              ) : (
                <span className="text-blue-900 text-xl font-bold">€{currentPrice.price}</span>
              )}
            </div>
            {currentPrice.isCustomQuote && (
              <div className="mt-3 p-3 bg-blue-100 rounded-md text-blue-800 text-sm">
                For groups larger than 16 passengers, we'll prepare a personalized quote based on your specific needs. 
                Our team will send the detailed pricing to your email within 2 hours.
              </div>
            )}
          </div>
        </div>
      )}

      <LocationMap
        pickupAddress={locationData.pickupAddress}
        dropoffAddress={locationData.dropoffAddress}
        className="mb-6"
      />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Your Vehicle</h3>
          <div className="grid grid-cols-1 gap-4">
            {vehicles.map((vehicle) => {
              const isDisabled = passengers > vehicle.maxPassengers;
              const isSelected = formData.vehicleType === vehicle.type;
              
              return (
                <button
                  key={vehicle.type}
                  type="button"
                  onClick={() => !isDisabled && handleVehicleSelect(vehicle.type)}
                  disabled={isDisabled}
                  className={`
                    relative flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg border-2 text-left w-full
                    transition-all duration-200
                    ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:border-blue-300'}
                    ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                  `}
                >
                  <div className="w-36 h-24 sm:w-32 sm:h-24 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
                    {isDisabled && (
                      <p className="text-xs text-red-500 mt-1">
                        Not available for {passengers} passengers
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">
                      Max {vehicle.maxPassengers} passengers
                    </p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <FormInput
          label="Full Name"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          required
          icon={User}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            required
            icon={Phone}
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange({ email: e.target.value })}
            required
            icon={Mail}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <MessageSquare size={18} />
            Special Requirements
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={(e) => onChange({ specialRequests: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Examples: Child seat needed, extra luggage space, etc."
          />
        </div>

        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={onBack}
            type="button"
            className="flex-1"
            disabled={isSubmitting}
          >
            ← Back
          </Button>
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Request Booking'}
          </Button>
        </div>
      </form>
    </div>
  );
}