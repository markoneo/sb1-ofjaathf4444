import React, { useRef, useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { createAutocomplete } from '../../services/mapsService';
import FormError from './FormError';

interface AddressInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

export default function AddressInput({
  label,
  name,
  value,
  onChange,
  required = false,
  error
}: AddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState(value);
  const { isLoaded, loadError } = useGoogleMaps();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    // Clean up previous autocomplete instance
    if (autocompleteRef.current) {
      google.maps.event.clearInstanceListeners(autocompleteRef.current);
    }

    const instance = createAutocomplete(inputRef.current);
    if (!instance) return;

    autocompleteRef.current = instance;

    // Handle place selection
    const placeChangedListener = instance.addListener('place_changed', () => {
      const place = instance.getPlace();
      if (place.formatted_address) {
        setLocalValue(place.formatted_address);
        onChange(place.formatted_address);
      }
    });

    return () => {
      if (placeChangedListener) {
        google.maps.event.removeListener(placeChangedListener);
      }
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    // Only trigger onChange for manual input if there's no autocomplete suggestion
    if (!autocompleteRef.current?.getPlace()) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <MapPin size={18} />
        {label}
      </label>
      <div className="relative">
        <MapPin 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={localValue}
          onChange={handleInputChange}
          required={required}
          className={`
            w-full px-4 py-2 pl-10 border rounded-md 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? 'border-red-300' : 'border-gray-300'}
          `}
          placeholder={isLoaded ? "Start typing an address..." : "Loading address search..."}
          disabled={!isLoaded}
          autoComplete="off"
        />
      </div>
      {error && <FormError message={error} />}
      {loadError && <FormError message="Address search is currently unavailable" />}
    </div>
  );
}