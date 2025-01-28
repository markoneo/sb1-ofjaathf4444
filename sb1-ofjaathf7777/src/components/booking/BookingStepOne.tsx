import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import AddressInput from '../form/AddressInput';
import FormInput from '../form/FormInput';
import Button from '../ui/Button';
import { StepOneData } from '../../types/booking';
import LocationMap from './LocationMap';
import { calculatePrice } from '../../services/pricingService';

interface BookingStepOneProps {
  formData: StepOneData;
  onChange: (data: Partial<StepOneData>) => void;
  onNext: () => void;
}

export default function BookingStepOne({ formData, onChange, onNext }: BookingStepOneProps) {
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pickupAddress || !formData.dropoffAddress) {
      setError('Please enter pickup and dropoff addresses');
      return;
    }
    onNext();
  };

  useEffect(() => {
    const getPriceEstimate = async () => {
      if (formData.pickupAddress && formData.dropoffAddress) {
        setIsPriceLoading(true);
        setError(null);
        try {
          const estimate = await calculatePrice(
            formData.pickupAddress,
            formData.dropoffAddress,
            formData.passengers
          );
          onChange({ priceEstimate: estimate });
        } catch (error) {
          console.error('Error getting price estimate:', error);
          setError('Unable to calculate price. Please check the addresses and try again.');
        } finally {
          setIsPriceLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(getPriceEstimate, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData.pickupAddress, formData.dropoffAddress, formData.passengers]);

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <AddressInput
          label="Pick-Up Address"
          name="pickupAddress"
          value={formData.pickupAddress}
          onChange={(value) => onChange({ pickupAddress: value })}
          required
        />

        <AddressInput
          label="Drop-Off Address"
          name="dropoffAddress"
          value={formData.dropoffAddress}
          onChange={(value) => onChange({ dropoffAddress: value })}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={(e) => onChange({ date: e.target.value })}
            required
            icon={Calendar}
          />

          <FormInput
            label="Time"
            name="time"
            type="time"
            value={formData.time}
            onChange={(e) => onChange({ time: e.target.value })}
            required
            icon={Clock}
          />

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Users size={18} />
              Passengers
            </label>
            <select
              name="passengers"
              value={formData.passengers}
              onChange={(e) => onChange({ passengers: parseInt(e.target.value) })}
              required
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {[...Array(16)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? 'Passenger' : 'Passengers'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {formData.pickupAddress && formData.dropoffAddress && (
          <LocationMap
            pickupAddress={formData.pickupAddress}
            dropoffAddress={formData.dropoffAddress}
          />
        )}

        {error && (
          <div className="text-center p-4 bg-red-50 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {isPriceLoading && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="animate-pulse">Calculating prices...</div>
          </div>
        )}

        <Button type="submit" className="w-full">
          Next Step →
        </Button>
      </form>
    </div>
  );
}