import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, User, MessageSquare, CheckCircle, X, UserCheck, Award, Droplets } from 'lucide-react';
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
  const [vehiclePrices, setVehiclePrices] = useState<{[key: string]: any}>({});
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const calculatePrices = async () => {
      if (!locationData.pickupAddress || !locationData.dropoffAddress) {
        return;
      }

      setIsLoadingPrices(true);
      setError(null);
      const prices: {[key: string]: any} = {};
      
      try {
        const pricePromises = vehicles.map(async (vehicle) => {
          if (passengers <= vehicle.maxPassengers) {
            try {
              const price = await calculatePrice(
                locationData.pickupAddress,
                locationData.dropoffAddress,
                passengers,
                vehicle.type
              );
              prices[vehicle.type] = price;
            } catch (err) {
              console.error(`Error calculating price for ${vehicle.type}:`, err);
            }
          }
        });

        await Promise.all(pricePromises);
        setVehiclePrices(prices);
      } catch (err) {
        setError('Unable to calculate prices. Please try again.');
        console.error('Error calculating prices:', err);
      } finally {
        setIsLoadingPrices(false);
      }
    };

    calculatePrices();
  }, [locationData.pickupAddress, locationData.dropoffAddress, passengers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.vehicleType) {
      setError('Please select a vehicle type');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit();
      setShowSuccess(true);
    } catch (err) {
      setError('There was an error submitting your booking. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <LocationMap
        pickupAddress={locationData.pickupAddress}
        dropoffAddress={locationData.dropoffAddress}
        className="mb-6"
      />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Your Vehicle</h3>
          {isLoadingPrices && (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="animate-pulse">Calculating prices for each vehicle type...</div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4">
            {vehicles.map((vehicle) => {
              const isDisabled = passengers > vehicle.maxPassengers;
              const isSelected = formData.vehicleType === vehicle.type;
              const priceInfo = vehiclePrices[vehicle.type];
              
              return (
                <button
                  key={vehicle.type}
                  type="button"
                  onClick={() => !isDisabled && onChange({ vehicleType: vehicle.type })}
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
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
                      {!isDisabled && priceInfo && !priceInfo.isCustomQuote && (
                        <span className="text-lg font-bold text-blue-600">€{priceInfo.price}</span>
                      )}
                    </div>
                    {isDisabled ? (
                      <p className="text-xs text-red-500 mt-1">
                        Not available for {passengers} passengers
                      </p>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          Max {vehicle.maxPassengers} passengers
                        </p>
                        <div className="flex flex-col gap-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <UserCheck size={16} className="text-blue-600" />
                            <span>Meet and Greet</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award size={16} className="text-blue-600" />
                            <span>Professional driver</span>
                          </div>
                          {vehicle.type === 'executive' && (
                            <div className="flex items-center gap-2">
                              <Droplets size={16} className="text-blue-600" />
                              <span>Complimentary water</span>
                            </div>
                          )}
                        </div>
                        {priceInfo?.isCustomQuote && (
                          <p className="text-sm text-blue-600 mt-2">
                            Custom quote will be provided
                          </p>
                        )}
                      </div>
                    )}
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
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
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